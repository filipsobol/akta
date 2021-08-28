
import { join } from 'path';
import { AktaContextFactory } from '@akta/app';

export async function loadApplication({ vite, root, production }): Promise<AktaContextFactory> {
  return production
    ? (await import(join(root, './.akta/akta.config.js'))).default.default
    : (await vite.ssrLoadModule('/akta.config.ts')).default;
}
