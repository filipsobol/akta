import { createAktaApp } from '@akta/app';
import App from './App.vue';

export default createAktaApp({
  App,
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
