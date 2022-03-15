import { extname } from 'path';
import glob from 'fast-glob';
import { PagesPluginParameters } from './types';

const VIRTUAL_MODULE_ID = 'virtual:routes';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

const EXCLUDE = [
  'node_modules',
  '.git'
];

export function pagesPlugin(options: PagesPluginParameters) {

  return {
    name: 'akta-plugin-pages',
    enforce: 'pre',
    async resolveId(id: string): Promise<string | void> {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },
    async load(id: string) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) {
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
        const rootDirName = options.paths.find(userPath => filePath.startsWith(userPath)) as string;
        const rawPath = normalizeRawPath(filePath, rootDirName);

        return `{
          rawPath: '${ rawPath }',
          path: '${ normalizeRouterPath(rawPath) }',
          component: () => import('./${ filePath }')
        }`;
      });

      return `
        const routes = [${routes}];
    
        export default routes;
      `;
    }
  };
}

function normalizeRawPath(filePath: string, rootDirName: string): string {
  return filePath
    .replace(rootDirName, '') // Remove root dir
    .replace(extname(filePath), ''); // Remove file extension
}

function normalizeRouterPath(path: string) {
  const parts = path
    .split('/')
    .map((part: string) => {
      if (!part.includes('[') || !part.includes(']')) {
        return part;
      }
      
      return part
        .replaceAll(/^\[\.{3}(.*)\]$/g, ':$1(.*)*') // Convert "[...id]" into ":id(.*)*"
        .replaceAll(/\[(.*)\]/g, ':$1'); // Convert "[id]" into ":id"
    });

  if (parts.at(-1) === 'index') {
    parts.pop(); // Remove "/index" if it's at the end of path
  }

  return parts.join('/') || '/';
}