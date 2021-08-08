import { createSSRApp, ref } from 'vue';
import { createHead } from '@vueuse/head';
import { createRouter } from './router';
import { Configuration, AktaContext, AktaContextFactory } from './types';
import { createConfig } from './config/createConfig';

export function createAktaApp(configuration: Configuration): AktaContextFactory {
  const isClient = !import.meta.env.SSR;

  const {
    App,
    routes,
    head: headConfig
  } = createConfig(configuration);

  function createAkta(): AktaContext {
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

  if (isClient) {
    const { app, router } = createAkta();

    // wait until router is ready before mounting to ensure hydration match
    router.isReady().then(() => app.mount('#app'));
  }

  return createAkta;
};
