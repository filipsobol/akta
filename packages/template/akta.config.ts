import App from './App.vue';

export default {
  app: App,

  routes: import.meta.glob('./pages/*'),

  title: 'Akta App',
};
