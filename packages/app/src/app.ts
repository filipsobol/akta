import { createSSRApp, ref } from 'vue';
import { createHead } from '@vueuse/head';
import { createRouter } from './router';
import { Configuration, AktaContext, AktaContextFactory } from './types';

export function createAktaApp(configuration: Configuration): AktaContextFactory {
  const isClient = !import.meta.env.SSR;

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
    
    head.addHeadObjs(ref(headConfig));

    return {
      app,
      router,
      head,
      configuration
    };
  };

  function startClient(): void {
    if (!isClient) {
      throw new Error('\'startClient\' should should not be called on server.');
    }

    const { app, router } = createApp();
  
    // wait until router is ready before mounting to ensure hydration match
    router.isReady().then(() => app.mount('#app'));
  }

  return {
    configuration,
    createApp,
    startClient
  };
};
