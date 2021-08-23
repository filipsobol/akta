import { resolve, join, dirname } from 'path';
import { readFileSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'fs';
import { render } from './render';
import { CreateApp, CreateAppParameters } from './types';
import { createServer } from './server';

export async function prerender({ root, production }: CreateAppParameters): Promise<void> {
  const {
    vite,
    configuration,
    createApp
  }: CreateApp = await createServer({ root, production });

  const outDir = resolve(root, vite.config.build.outDir);
  const ssrManifestPath = resolve(outDir, 'ssr-manifest.json');
  const manifest = JSON.parse(readFileSync(ssrManifestPath, 'utf-8'));
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

    const filePath = `${url === '/' ? '/index' : url}.html`;
    const outPath = join(outDir, filePath);
    const outDirPath = dirname(outPath);

    if (!existsSync(outDirPath)) {
      mkdirSync(outDirPath, { recursive: true });
    }

    writeFileSync(outPath, html);
    console.log(`Generated ${filePath}`);
  }

  rmSync(ssrManifestPath);
  rmSync(join(root, './.akta'), { recursive: true });
  vite.close();
}
