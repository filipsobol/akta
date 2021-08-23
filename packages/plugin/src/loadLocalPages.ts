import glob from 'fast-glob';
import { parse, sep } from 'path';
import { PagesPluginParameters } from './types';

const VIRTUAL_NAME = 'virtual:local-routes';

const EXCLUDE = [
  'node_modules',
  '.git'
];

export function pagesPlugin(options: PagesPluginParameters) {
  function isVirtualFile(id: string) {
    return id === VIRTUAL_NAME;
  }

  return {
    name: 'akta-plugin-pages',
    enforce: 'pre',
    async resolveId(id: string): Promise<string | void> {
      if (isVirtualFile(id)) {
        return id;
      }
    },
    async load(id: string) {
      if (!isVirtualFile(id)) {
        return;
      }

      const extensions = options.extensions.join('|');
      const pathGlobs = options.paths.map(path => `${path}/**/*.(${extensions})`);
    
      const paths = await glob(pathGlobs, {
        ignore: [...EXCLUDE, ...options.exclude],
        dot: true,
        unique: true,
        onlyFiles: true
      });

      const routes = paths.map(filePath => {
        const rootDirName = options.paths.find(userPath => filePath.startsWith(userPath));
        let { dir, name } = parse(filePath.replace(`${ rootDirName }${ sep }`, ''));
        let routerPath = name;

        if (isCatchAll(routerPath)) {
          routerPath = ':all(.*)*';
          name = '404';
        }

        if (isIndex(routerPath)) {
          routerPath = '';
        }

        return {
          name: `${ dir.replaceAll('/', '_') }_${ name }`,
          routerPath: `/${ [dir, routerPath].filter(Boolean).join('/') }`,
          filePath,
        };
      })
      .map(route => {
        return `{
          name: '${route.name}',
          path: '${route.routerPath}',
          component: () => import('./${ route.filePath }'),
          props: true
        }`;
      });

      return `
        const routes = [${routes}];
    
        export default routes;
      `;
    }
  };
}

function isIndex(routerPath: string): boolean {
  return routerPath === 'index';
}

function isCatchAll(routerPath: string): boolean {
  return routerPath === '_all';
}
