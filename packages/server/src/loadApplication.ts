
import { join } from 'path';
import { ViteDevServer } from 'vite';
import { AktaContextFactory } from '@akta/app';

export async function loadProductionApplication(root: string): Promise<AktaContextFactory> {
  return (await import(join(root, './.akta/akta.config.js'))).default;
}

export async function loadDevelopmentApplication(
  vite: ViteDevServer,
  optionsPath: string
): Promise<AktaContextFactory> {
  return (await vite.ssrLoadModule(optionsPath)).default;
}