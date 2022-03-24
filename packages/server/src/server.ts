import { resolve } from 'path';
import { readFileSync } from 'fs';
import middie from 'middie';
import fastifyStatic from 'fastify-static';
import fastify, { FastifyInstance } from 'fastify';
import { createServer as createVite, ViteDevServer } from 'vite';
import { renderRoute } from './render/renderRoute';
import { loadDevelopmentApplication, loadProductionApplication } from './loadApplication';

/**
 * Sets up a Fastify server with production settings
 */
export async function createSSRServer(root: string): Promise<FastifyInstance> {
  const { createApp } = await loadProductionApplication(root);
  const outDir = resolve(root, './dist');
  const ssrManifestPath = resolve(outDir, 'ssr-manifest.json');
  const manifest = JSON.parse(readFileSync(ssrManifestPath, 'utf-8'));
  const template = readFileSync(resolve(outDir, 'index.html'), 'utf-8');

  const server = fastify({
    logger: {
      level: 'error'
    }
  });

  await server.register(fastifyStatic, {
    root: resolve(outDir, 'assets'),
    prefix: '/assets'
  });

  server.get('*', async (request, response) => {
    try {
       const html = await renderRoute({
        url: request.url,
        createApp,
        template,
        manifest
      });

      response
        .status(200)
        .header('Content-Type', 'text/html')
        .send(html);
    } catch(e) {
      // TODO: Show "Something went wrong" page
    }
  });

  return server;
}

/**
 * Sets up a Fastify server with development settings, including Vite server
 */
export async function createDevelopmentServer(
  root: string,
  optionsPath: string
): Promise<FastifyInstance> {
  const server = fastify({
    logger: {
      level: 'warn'
    }
  });

  const vite = await createViteServer(root);

  await server.register(middie);

  server.use(vite.middlewares);

  server.get('*', async (request, response) => {
    try {
      const url = request.url;

      const template = await vite.transformIndexHtml(
        url,
        readFileSync(resolve('index.html'), 'utf-8')
      );

      const { createApp } = await loadDevelopmentApplication(vite, optionsPath);

      const html = await renderRoute({
        url,
        createApp,
        template
      });

      response
        .status(200)
        .header('Content-Type', 'text/html')
        .send(html);
    } catch(e: any) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      response
        .status(500)
        .send(e.stack);
    }
  });

  return server;
}

/**
 * Creates a Vite server
 */
async function createViteServer(root: string): Promise<ViteDevServer> {
  return await createVite({
    root,
    resolve: {
      alias: {
        '~/': root,
        '@/': root,
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
