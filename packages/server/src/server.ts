import { resolve } from 'path';
import { readFileSync } from 'fs';
import middie from 'middie';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import { createServer as createVite, ViteDevServer } from 'vite';
import { render } from './render';
import { renderRoute } from './renderRoute';
import { loadApplication } from './loadApplication';
import { CreateApp, CreateAppParameters } from './types';

export async function createServer({ root, production }: CreateAppParameters): Promise<CreateApp> {
  const vite = await createViteServer(root);
  const server = fastify({
    logger: {
      level: production ? 'error' : 'warn'
    }
  });

  await server.register(middie);
  // await server.register(fastifyStatic, {
  //   root: resolve(root, vite.config.build.assetsDir)
  // });
  server.use(vite.middlewares);

  server.get('*', async (req, res) => {
    try {
      const url = req.url;
      const template = await vite.transformIndexHtml(
        url,
        readFileSync(resolve('index.html'), 'utf-8')
      );
      const { createApp } = await loadApplication({
        vite,
        root,
        production
      });

      const html = await renderRoute({
        url,
        render,
        manifest: {},
        createApp,
        template
      });

      res
        .status(200)
        .header('Content-Type', 'text/html')
        .send(html);
    } catch (e: any) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res
        .status(500)
        .send(e.stack);
    }
  });

  return {
    server,
    vite
  };
}

async function createViteServer(root: string): Promise<ViteDevServer> {
  return await createVite({
    root,
    resolve: {
      alias: {
        '~/': root
      }
    },
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100
      }
    },
    build: {
      manifest: true
    }
  })
}
