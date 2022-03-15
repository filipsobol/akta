import {
  createMemoryHistory,
  createRouter as createVueRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';
import { PagesPluginRoute } from '@akta/plugin';

// @ts-ignore
import rawRoutes from 'virtual:local-routes';

export function createRouter(isClient: boolean) {
  const routes: RouteRecordRaw[] = rawRoutes.map((route: PagesPluginRoute) => ({
    path: route.path,
    component: route.component,
    props: true,
  }));


  return createVueRouter({
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
};
