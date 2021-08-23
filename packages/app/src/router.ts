import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from 'vue-router';
import { Configuration } from './types';

export function createRouter(isClient: boolean, routes: Configuration['routes']) {
  return _createRouter({
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
};
