import { createAktaApp } from '@akta/app';
import App from './App.vue';
// @ts-ignore
import routes from 'virtual:generated-pages';

export default createAktaApp({
  App,
  server: {
    port: 3000
  },
  routes,
  head: {
    title: 'Test head title',
    meta: [
      {
        name: 'description',
        content: 'This is sample application created using Akta framework.'
      }
    ]
  }
});
