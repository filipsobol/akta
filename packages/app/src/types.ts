import { Router } from 'vue-router';
import { App, Component } from 'vue';
import { HeadClient } from '@vueuse/head';
import { RouteRecordRaw } from 'vue-router';

export interface AktaAppParams {
  App: Component;
  routes: any;
}

export interface CreateAkta {
  app: App;
  router: Router;
  head: HeadClient
}

export interface CreateAktaFactory {
  (): CreateAkta;
}

export interface Configuration {
  title: string;
  server: {
    port: number;
  };
  routes: RouteRecordRaw[];
  build: {
    outDir: string;
  };
}
