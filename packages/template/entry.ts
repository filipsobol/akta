import App from './App.vue';
import { createAktaApp } from '@akta/app';

export const createAkta = createAktaApp({
  App,
  routes: import.meta.glob('./pages/*')
});
