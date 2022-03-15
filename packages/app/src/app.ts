import rawRoutes from 'virtual:routes';
import { createSSRApp, ref } from 'vue';
import { createHead } from '@vueuse/head';
import { createRouter } from './router';
import type { HeadObject } from '@vueuse/head';
import type { Configuration, AktaContext, AktaContextFactory } from './types';

export function createAktaApp(configuration: Configuration): AktaContextFactory {
  const isClient = typeof window !== 'undefined';

  const {
    App,
    router: routerConfig,
    head: headConfig
  } = configuration;

  function createApp(): AktaContext {
    const app = createSSRApp(App);
    const router = createRouter({
      rawRoutes,
      isClient,
      routerConfig
    });
    const head = createHead();

    app
      .use(router)
      .use(head);

    if (headConfig) {
      head.addHeadObjs(ref<HeadObject>(headConfig));
    }

    return {
      app,
      router,
      head,
      configuration
    };
  };

  if (isClient) {
    const { app, router } = createApp();
  
    // Wait until router is ready before mounting to ensure hydration match
    router.isReady().then(() => app.mount('#app', true));
  }

  return {
    configuration,
    createApp,
    rawRoutes,
  };
};
