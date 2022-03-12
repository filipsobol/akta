import { createSSRApp, ref } from 'vue';
import { createHead, HeadObject } from '@vueuse/head';
import { createRouter } from './router';
import { Configuration, AktaContext, AktaContextFactory } from './types';

export function createAktaApp(configuration: Configuration): AktaContextFactory {
  const isClient = typeof window !== 'undefined';

  const {
    App,
    routes,
    head: headConfig
  } = configuration;

  function createApp(): AktaContext {
    const app = createSSRApp(App);
    const router = createRouter(isClient, routes);
    const head = createHead();

    app
      .use(router)
      .use(head);

    head.addHeadObjs(ref<HeadObject>(headConfig));

    return {
      app,
      router,
      head,
      configuration
    };
  };

  if (isClient) {
    const { app, router } = createApp();
  
    // wait until router is ready before mounting to ensure hydration match
    router.isReady().then(() => app.mount('#app', true));
  }

  return {
    configuration,
    createApp,
  };
};
