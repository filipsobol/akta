import routes from 'virtual:routes';
import {
  createMemoryHistory,
  createRouter as createVueRouter,
  createWebHistory
} from 'vue-router';
import type { RouterConfiguration } from './types';

interface CreateRouterParameters {
  isClient: boolean;
  routerConfig?: RouterConfiguration;
}

export function createRouter({
  isClient,
  routerConfig
}: CreateRouterParameters) {
  return createVueRouter({
    ...routerConfig,
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
};
