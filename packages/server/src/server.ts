import express from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createServer as createVite, ViteDevServer } from 'vite';
import { render } from './render';
import { renderRoute } from './renderRoute';
import { loadApplication } from './loadApplication';
import { CreateApp, CreateAppParameters } from './types';

export async function createServer({ root, production }: CreateAppParameters): Promise<CreateApp> {
  const vite = await createViteServer(root);
  const server = express();
  server.use(vite.middlewares);

  server.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
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
        .set({ 'Content-Type': 'text/html' })
        .end(html);
    } catch (e: any) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  })

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
      fs: {
        strict: true
      },
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
