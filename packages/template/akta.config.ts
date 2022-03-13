import { createAktaApp } from '@akta/app';
import App from './App.vue';
// @ts-ignore
import routes from 'virtual:local-routes';

export default createAktaApp({
  App,
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
