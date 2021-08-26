import { resolve, join, dirname } from 'path';
import { readFileSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'fs';
import { render } from './render';
import { createServer } from './server';
import { renderRoute } from './renderRoute';
import { CreateApp, CreateAppParameters } from './types';

export async function prerender({ root, production }: CreateAppParameters): Promise<void> {
  const {
    vite,
    configuration,
    createApp
  }: CreateApp = await createServer({ root, production });

  const outDir = resolve(root, join(root, './dist'));
  const ssrManifestPath = resolve(outDir, 'ssr-manifest.json');
  const manifest = JSON.parse(readFileSync(ssrManifestPath, 'utf-8'));
  const template = readFileSync(resolve(outDir, 'index.html'), 'utf-8');
  const routes = configuration.routes.map(route => buildRoute({
    url: route.path,
    outDir,
    manifest,
    createApp,
    template
  }));

  await Promise.all(routes);

  rmSync(ssrManifestPath);
  rmSync(join(root, './.akta'), { recursive: true });
  vite.close();
}

async function buildRoute({
  url,
  outDir,
  manifest,
  createApp,
  template
}) {
  const html = await renderRoute({
    url,
    render,
    manifest,
    createApp,
    template
  });

  const filePath = `${url === '/' ? '/index' : url}.html`;
  const outPath = join(outDir, filePath);
  const outDirPath = dirname(outPath);

  if (!existsSync(outDirPath)) {
    mkdirSync(outDirPath, { recursive: true });
  }

  writeFileSync(outPath, html);
  console.log(`Generated ${filePath}`);
}