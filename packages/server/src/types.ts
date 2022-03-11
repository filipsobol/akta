import { AktaContext } from '@akta/app';
import { FastifyInstance } from 'fastify';
import { ManifestChunk, ViteDevServer } from 'vite';

export interface RenderParameters {
  url: string;
  context: AktaContext;
  manifest: Record<string, ManifestChunk>;
}

export interface CreateApp {
  server: FastifyInstance;
  vite: ViteDevServer;
}

export interface CreateAppParameters {
  root: string;
  production: boolean;
}
