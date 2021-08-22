import { parse } from 'path';
import glob from 'fast-glob';
import { PagesPluginParameters } from './types';

const VIRTUAL_NAME = 'virtual:local-routes';

const EXCLUDE = [
  'node_modules',
  '.git'
];

export function pagesPlugin(userOptions: PagesPluginParameters) {
  function isVirtualFile(id: string) {
    return id === VIRTUAL_NAME;
  }

  return {
    name: 'akta-plugin-pages',
    enforce: 'pre',
    async resolveId(id: string) {
      if (isVirtualFile(id)) {
        return id;
      }
    },
    async load(id: string) {
      if (!isVirtualFile(id)) {
        return;
      }

      const extensions = userOptions.extensions.join('|');
      const pathGlobs = userOptions.paths.map(path => `${path}/**/*.(${extensions})`);
    
      const paths = await glob(pathGlobs, {
        ignore: [...EXCLUDE, ...userOptions.exclude],
        dot: true,
        unique: true,
        onlyFiles: true
      });

      const routes = paths.map(path => {
        let { dir, base, ext, name } = parse(path);
        let routerPath = name;

        if (routerPath === 'index') {
          routerPath = '';
        }

        if (name.startsWith('[') && name.endsWith(']')) {
          const result = name.match(/\[(.*)\]/);

          if (Array.isArray(result)) {
            routerPath = result[1];
          }

          if (routerPath === '...all') {
            routerPath = ':all(.*)*';
            name = '404';
          }
        }        

        return {
          name: `${ dir.replaceAll('/', '_') }_${ name }`,
          routerPath: `/${ routerPath }`,
          path,
        };
      })
      .map(route => {
        return `{
          name: '${route.name}',
          path: '${route.routerPath}',
          component: () => import('./${ route.path }'),
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
