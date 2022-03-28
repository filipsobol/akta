import { resolve } from 'path';
import { build as viteBuild } from 'vite';
import { CreateAppParameters } from './types';

export async function build({ root, optionsPath }: CreateAppParameters): Promise<void> {
  await buildClient(root);
  await buildSSR(root, optionsPath);  
}

async function buildClient(root: string): Promise<void> {
  await viteBuild({
    root,
    build: {
      outDir: resolve(root, './dist/client'),
      minify: true,
      ssrManifest: true,
      rollupOptions: {
        input: {
          app: resolve(root, './index.html')
        }
      }
    }
  });
}

async function buildSSR(root: string, optionsPath: string): Promise<void> {
  await viteBuild({
    root,
    build: {
      ssr: resolve(root, optionsPath),
      rollupOptions: {
        output: {
          format: 'esm'
        }
      },
      outDir: resolve(root, './dist/server'),
      minify: true,
      cssCodeSplit: false
    }
  });
}
