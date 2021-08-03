import { Component, createSSRApp } from 'vue';
import { createHead } from '@vueuse/head';
import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router';

export interface AktaAppParams {
  App: Component;
  routes: any;
  fn?: () => Promise<void>;
}

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

export function createRouter(isClient: boolean, pages) {
  const routes = Object.entries(pages).map(([ path, component ]) => {
    let name = path
      .match(/\.\/pages(.*)\.(.*)$/)
      [1]
      .toLowerCase();
    
    const predefinedRoutes = {
      '/index': '/',
      '/[...all]': '/:pathMatch(.*)*'
    };
    
    return {
      name,
      path: predefinedRoutes[name] ?? name,
      component
    };
  });
7
  return _createRouter({
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
};
