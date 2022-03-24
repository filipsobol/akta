import type { App, Component } from 'vue';
import type { HeadClient, HeadObject } from '@vueuse/head';
import type { Router, RouterScrollBehavior } from 'vue-router';

export interface Configuration {
  App: Component;
  head?: HeadObject;
  router?: RouterConfiguration;
}

export interface RouterConfiguration {
  scrollBehavior?: RouterScrollBehavior;
}

export interface AktaContext {
  app: App;
  router: Router;
  head: HeadClient;
  configuration: Configuration;
}

export interface AktaContextFactory {
  configuration: Configuration;
  createApp: () => AktaContext;
}
