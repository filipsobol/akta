import { Express } from 'express';
import { ViteDevServer } from 'vite';
import { Configuration } from '@akta/app';

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
