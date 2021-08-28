import { Express } from 'express';
import { AktaContext } from '@akta/app';
import { ManifestChunk, ViteDevServer } from 'vite';

export interface RenderParameters {
  url: string;
  context: AktaContext;
  manifest: Record<string, ManifestChunk>;
}

export interface CreateApp {
  server: Express;
  vite: ViteDevServer;
}

export interface CreateAppParameters {
  root: string;
  production: boolean;
}
