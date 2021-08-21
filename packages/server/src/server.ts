import express from 'express';
import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import { AktaContextFactory } from '@akta/app';
import { createServer as createVite, ViteDevServer } from 'vite';
import { render } from './render';
import { CreateApp, CreateAppParameters } from './types';

export async function createServer({ root, production }: CreateAppParameters): Promise<CreateApp> {
  const vite = await createViteServer(root);
  const { configuration, createApp } = await createContextFactory({
    vite,
    root,
    production
  });

  const server = express();
  server.use(vite.middlewares);

  server.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      const {
        appHtml,
        preloadLinks,
        headTags,
        htmlAttrs,
        bodyAttrs
      } = await render({
        url,
        context: createApp(),
        manifest: {}
      });

      const template = await vite.transformIndexHtml(
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
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  })

  return {
    server,
    vite,
    configuration,
    createApp
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

async function createContextFactory({ vite, root, production }): Promise<AktaContextFactory> {
  return production
    ? (await import(join(root, './.akta/akta.config.js'))).default.default
    : (await vite.ssrLoadModule('/akta.config.ts')).default;
}
