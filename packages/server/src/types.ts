import { Express } from 'express';
import { ManifestChunk, ViteDevServer } from 'vite';
import { AktaContext, AktaContextFactory, Configuration } from '@akta/app';

export interface RenderParameters {
  url: string;
  context: AktaContext;
  manifest: Record<string, ManifestChunk>;
}

export interface CreateApp {
  server: Express;
  vite: ViteDevServer;
  configuration: Configuration;
  createApp: AktaContextFactory['createApp'];
}

export interface CreateAppParameters {
  root: string;
  production: boolean;
}
