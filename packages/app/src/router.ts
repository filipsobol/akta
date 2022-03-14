import {
  createMemoryHistory,
  createRouter as createVueRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';
import { PagesPluginRoute } from '@akta/plugin';

export function createRouter(isClient: boolean, rawRoutes: PagesPluginRoute[]) {
  const routes: RouteRecordRaw[] = rawRoutes.map(route => ({
    path: route.path,
    component: route.component,
    props: true,
  }));


  return createVueRouter({
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
};
