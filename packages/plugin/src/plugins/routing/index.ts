import glob from 'fast-glob';
import { join, parse, relative } from 'path';
import update from 'lodash.update';
import type { Plugin } from 'vite';
import type { RoutingPluginParameters } from '../../types';

const VIRTUAL_MODULE_ID = 'virtual:routes';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

const EXCLUDE = [
  'node_modules',
  '.git'
];

enum RouteType {
  LAYOUT,
  SUBLAYOUT,
  PAGE
}

interface NormalizedRoute {
  filesystemPath: string;
  routerPath: string;
  relativePath: string;
  type: RouteType;
  children: NormalizedRoute[];
}

export function RoutingPlugin(options: RoutingPluginParameters): Plugin {
  return {
    name: 'akta-plugin-pages',

    enforce: 'pre',

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }

      return;
    },

    async load(id: string) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) {
        return;
      }

      // Get paths to all files matching provided options
      const filesystemPaths = await getFilePaths(options);

      // Parse each route to get information useful in the next steps
      const normalized: NormalizedRoute[] = filesystemPaths
        .sort()
        .map(filesystemPath => {
          const { dir, name } = parse(filesystemPath);

          const type = name === '__layout'
            ? RouteType.LAYOUT
            : name === '__layout.nested'
            ? RouteType.SUBLAYOUT
            : RouteType.PAGE;

          return {
            type,
            filesystemPath,
            routerPath: [dir, name].filter(Boolean).join('/'),
            relativePath: dir,
            children: []
          };
        })
        .reverse();
      
      // TODO: Skip if there are no layouts

      // Register all root layouts
      const routes = normalized.filter(route => route.type === RouteType.LAYOUT) || [];

      // Register all sublayouts
      normalized
        .filter(route => route.type === RouteType.SUBLAYOUT)
        .forEach(route => {
          const path = getPathToClosestLayout(route, routes);
          path.length
            ? update(routes, path, (layoutChildren) => layoutChildren.concat([ route ]))
            : routes.push(route);
        });

      // Register all pages
      normalized
        .filter(route => route.type === RouteType.PAGE)
        .forEach(route => {
          const path = getPathToClosestLayout(route, routes);

          path.length
            ? update(routes, path, (layoutChildren) => layoutChildren.concat([ route ]))
            : routes.push(route);
        });
      
      const routerRoutes = routes.map(route => stringifyRoute(route, options));
      const stringified = JSON
        .stringify(routerRoutes)
        .replaceAll(/"component":"(.*?)"/g, '"component": () => import("$1")'); // Change path to dynamic import

      return `
        const routes = ${ stringified };
    
        export default routes;
      `;
    }
  };
}

/**
 * Returns array of paths to files matching options provided to the plugin
 */
function getFilePaths(options: RoutingPluginParameters): Promise<string[]> {
  const extensions = options.extensions.join('|');
  const pattern = `**/*.(${ extensions })`;

  return glob(pattern, {
    ignore: [...EXCLUDE, ...options.exclude],
    cwd: options.path,
    dot: true,
    unique: true,
    onlyFiles: true
  });
}

/**
 * Converts normalized path to the format acceptable by Vue Router
 */
function getRouterPath(dir: string): string {
  const parsedSegments = dir
    .split('/')
    .map(segment => {
      if (!segment.includes('[') || !segment.includes(']')) {
        return segment;
      }

      if (segment.includes('...')) {
        return segment.replace(/^\[\.{3}(.*)\]$/g, ':$1(.*)*') // Convert "[...id]" into ":id(.*)*"
      }
      
      return segment.replaceAll(/\[(.*)\]/g, ':$1'); // Convert "[id]" into ":id"
    });

  if (parsedSegments.at(-1) === 'index') {
    parsedSegments.pop(); // Remove "/index" if it's at the end of path
  }

  if (parsedSegments.at(-1) === '__layout') {
    parsedSegments.pop(); // Remove "/__layout" if it's at the end of path
  }

  if (parsedSegments.at(-1) === '__layout.nested') {
    parsedSegments.pop(); // Remove "/__layout.nested" if it's at the end of path
  }

  return parsedSegments.join('/') || '';
}

function stringifyRoute(route: NormalizedRoute, options: RoutingPluginParameters) {
  return {
    path: `/${ getRouterPath(route.routerPath) }`,
    component: `./${ join(options.path, route.filesystemPath) }`,
    children: route.children.map(route => stringifyRoute(route, options)),
    props: true
  };
}

function getPathToClosestLayout(route: NormalizedRoute, layouts: NormalizedRoute[], path: string[] = []): string[] {
  const index = layouts.findIndex(({ relativePath, type }) => {
    const path = relative(relativePath, route.relativePath);
    return type !== RouteType.PAGE && !path.startsWith('.')
  });

  if (index > -1) {
    return getPathToClosestLayout(route, layouts[index].children!, path.concat([ String(index), 'children' ]));
  }

  return path;
}
