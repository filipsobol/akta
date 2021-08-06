import { Express } from 'express';
import { ViteDevServer } from 'vite';
import { Component } from 'vue';

export interface Configuration {
  title: string;
  server: {
    port: number;
  };
  routes: Array<Record<string, Component>>;
  build: {
    outDir: string;
  };
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
