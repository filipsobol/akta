import { resolve, join } from 'path';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import { render } from './render';
import { CreateApp, CreateAppParameters } from './types';
import { createServer } from './server';

export async function prerender({ root }: CreateAppParameters): Promise<void> {
  const {
    vite,
    configuration,
    createApp
  }: CreateApp = await createServer({ root });

  const outDir = resolve(root, vite.config.build.outDir);
  const manifest = JSON.parse(readFileSync(resolve(outDir, 'ssr-manifest.json'), 'utf-8'));
  const template = readFileSync(resolve(outDir, 'index.html'), 'utf-8');
  const routesToPrerender = configuration.routes.map(route => route.path);

  for (const url of routesToPrerender) {
    const {
      appHtml,
      preloadLinks,
      headTags,
      htmlAttrs,
      bodyAttrs
    } = await render({
      url,
      context: createApp(),
      manifest
    });

    const html = template
      .replace('data-html-attrs', htmlAttrs)
      .replace('data-body-attrs', bodyAttrs)
      .replace('<!--head-tags-->', headTags)
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml);

    const filePath = `${url === '/' ? 'index' : url}.html`;
    writeFileSync(join(outDir, filePath), html);
    console.log(`Generated ${filePath}`);
  }

  unlinkSync(resolve(outDir, 'ssr-manifest.json'));
  vite.close();
}
