import { createSSRApp } from 'vue';
import { createHead } from '@vueuse/head';
import { createRouter } from './router';
import { AktaAppParams, CreateAkta, CreateAktaFactory } from './types';

export function createAktaApp({ App, routes, fn }: AktaAppParams): CreateAktaFactory {
  const isClient = !import.meta.env.SSR;

  function createAkta(): CreateAkta {
    const app = createSSRApp(App);
    const router = createRouter(isClient, routes);
    const head = createHead();

    app
      .use(router)
      .use(head);

    return {
      app,
      router,
      head
    };
  };

  if (isClient) {
    const { app, router } = createAkta();

    // wait until router is ready before mounting to ensure hydration match
    router.isReady().then(() => app.mount('#app'));
  }

  return createAkta;
};
