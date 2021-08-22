import { join } from 'path';
import { build as viteBuild } from 'vite';
import { CreateAppParameters } from './types';

export async function build({ root, production }: CreateAppParameters): Promise<void> {
  await buildClient(root);
  await buildServer(root);  
}

async function buildClient(root: string): Promise<void> {
  await viteBuild({
    build: {
      outDir: join(root, './dist'),
      minify: true,
      ssrManifest: true,
      rollupOptions: {
        input: {
          app: join(root, './index.html')
        }
      }
    }
  });
}

async function buildServer(root: string): Promise<void> {
  await viteBuild({
    build: {
      ssr: join(root, './akta.config.ts'),
      outDir: join(root, './.akta'),
      minify: true,
      cssCodeSplit: false
    }
  });
}
