import { createSSRApp } from 'vue';
import { createHead } from '@vueuse/head';
import { createRouter } from './router';
import { AktaAppParams } from './types';

export function createAktaApp({ App, routes, fn }: AktaAppParams) {
  const isClient = typeof window !== 'undefined';

  function createAkta() {
    const app = createSSRApp(App);
    const router = createRouter(isClient, routes);
    const head = createHead();

    app.use(router);
    app.use(head);

    return {
      app,
      router
    };
  };

  if (isClient) {
    const { app, router } = createAkta();

    // wait until router is ready before mounting to ensure hydration match
    router.isReady().then(() => app.mount('#app'));
  }

  return createAkta;
};
