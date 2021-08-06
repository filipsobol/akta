import App from './App.vue';
import { createAktaApp } from '@akta/app';
// @ts-ignore
import routes from 'virtual:generated-pages';

export const createAkta = createAktaApp({
  App,
  routes
});
