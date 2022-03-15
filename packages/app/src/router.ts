import {
  createMemoryHistory,
  createRouter as createVueRouter,
  createWebHistory
} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { PagesPluginRoute } from '@akta/plugin';
import type { RouterConfiguration } from './types';

interface CreateRouterParameters {
  rawRoutes: PagesPluginRoute;
  isClient: boolean;
  routerConfig?: RouterConfiguration;
}

export function createRouter({
  rawRoutes,
  isClient,
  routerConfig
}: CreateRouterParameters) {
  const routes: RouteRecordRaw[] = rawRoutes.map((route: PagesPluginRoute) => ({
    path: route.path,
    component: route.component,
    props: true,
  }));

  return createVueRouter({
    ...routerConfig,
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
};
