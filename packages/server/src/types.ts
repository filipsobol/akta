import { AktaContext } from '@akta/app';
import { FastifyInstance } from 'fastify';
import { ViteDevServer } from 'vite';

export interface RenderParameters {
  url: string;
  context: AktaContext;
  manifest: Record<string, string[]>;
}

export interface CreateApp {
  server: FastifyInstance;
  vite: ViteDevServer;
}

export interface CreateAppParameters {
  root: string;
  production: boolean;
}

export interface AddPreloadLinksParameters {
  context: AktaContext;
  modules: Set<string>;
  manifest: Record<string, string[]>;
}
