import { Router } from 'vue-router';
import { App, Component } from 'vue';
import { HeadClient } from '@vueuse/head';

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
