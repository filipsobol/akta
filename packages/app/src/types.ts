import { Router } from 'vue-router';
import { App, Component } from 'vue';
import { HeadClient, HeadObject } from '@vueuse/head';

export interface Configuration {
  App: Component;
  head: HeadObject;
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
