import { resolve, join, dirname } from 'path';
import { readFileSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'fs';
import { renderRoute } from './renderRoute';
import { loadProductionApplication } from './loadApplication';

export async function prerender(root: string): Promise<void> {
  const { createApp, configuration } = await loadProductionApplication(root);
  const outDir = resolve(root, './dist');
  const ssrManifestPath = resolve(outDir, 'ssr-manifest.json');
  const manifest = JSON.parse(readFileSync(ssrManifestPath, 'utf-8'));
  const template = readFileSync(resolve(outDir, 'index.html'), 'utf-8');
  const routes = configuration.routes.map(route => buildRoute({
    url: route.rawPath,
    outDir,
    createApp,
    template,
    manifest
  }));

  await Promise.all(routes);

  rmSync(ssrManifestPath);
  rmSync(join(root, './.akta'), { recursive: true });
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

  const filePath = `${ url }.html`;
  const outPath = join(outDir, filePath);
  const outDirPath = dirname(outPath);

  if (!existsSync(outDirPath)) {
    mkdirSync(outDirPath, { recursive: true });
  }

  writeFileSync(outPath, html);
  console.log(`Generated ${filePath}`);
}