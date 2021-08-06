import vite from 'vite';
import express from 'express';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { render } from './render';
import { CreateApp, CreateAppParameters } from './types';

export async function createServer({ root }: CreateAppParameters): Promise<CreateApp> {
  const app = express();
  const server = await vite.createServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100
      }
    },
  })

  app.use(server.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      const {
        appHtml,
        preloadLinks,
        headTags,
        htmlAttrs,
        bodyAttrs
      } = await render(server, url, {});

      const template = await server.transformIndexHtml(
        url,
        readFileSync(resolve('index.html'), 'utf-8')
      );

      const html = template
        .replace('data-html-attrs', htmlAttrs)
        .replace('data-body-attrs', bodyAttrs)
        .replace('<!--head-tags-->', headTags)
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml);

      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(html);
    } catch (e) {
      server?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  })

  return {
    app,
    server
  };
}
