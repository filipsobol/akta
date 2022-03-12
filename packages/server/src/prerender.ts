import { resolve, join, dirname } from 'path';
import { readFileSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'fs';
import { createServer } from './server';
import { renderRoute } from './renderRoute';
import { CreateApp, CreateAppParameters } from './types';
import { loadApplication } from './loadApplication';

export async function prerender({ root, production }: CreateAppParameters): Promise<void> {
  const { vite }: CreateApp = await createServer({ root, production });
  const { createApp, configuration } = await loadApplication({
    vite,
    root,
    production
  });

  const outDir = resolve(root, join(root, './dist'));
  const ssrManifestPath = resolve(outDir, 'ssr-manifest.json');
  const manifest = JSON.parse(readFileSync(ssrManifestPath, 'utf-8'));
  const template = readFileSync(resolve(outDir, 'index.html'), 'utf-8');
  const routes = configuration.routes.map(route => buildRoute({
    url: route.path,
    outDir,
    createApp,
    template,
    manifest
  }));

  await Promise.all(routes);

  rmSync(ssrManifestPath);
  rmSync(join(root, './.akta'), { recursive: true });
  vite.close();
}

async function buildRoute({
  url,
  outDir,
  createApp,
  template,
  manifest,
}) {
  const html = await renderRoute({
    url,
    createApp,
    template,
    manifest
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