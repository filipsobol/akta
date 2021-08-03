import { Express } from 'express';
import { ViteDevServer } from 'vite';

export interface Configuration {
  build: {
    outDir: string;
  }
}

export interface PrerenderParameters {
  root: string;
  configuration: Configuration;
}

export interface CreateApp {
  app: Express;
  server: ViteDevServer | null;
}

export interface CreateAppParameters {
  root: string;
}
