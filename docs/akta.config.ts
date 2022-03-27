import { createAktaApp } from '@akta/app';
import App from './App.vue';

export default createAktaApp({
  App,
  head: {
    title: 'Akta - performant Vue framework',
    meta: [
      {
        name: 'description',
        content: 'Akta is performant Vue framework '
      }
    ]
  }
});
