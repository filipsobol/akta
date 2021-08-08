import { Express } from 'express';
import { ManifestChunk, ViteDevServer } from 'vite';
import { AktaContext } from '@akta/app';

export interface RenderParameters {
  url: string;
  context: AktaContext;
  manifest: Record<string, ManifestChunk>;
}

export interface CreateApp {
  server: Express;
  vite: ViteDevServer | null;
}

export interface CreateAppParameters {
  root: string;
}
