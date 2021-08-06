import { Configuration } from './types';
import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router';

export function createRouter(isClient: boolean, routes: Configuration['routes']) {
  return _createRouter({
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
};
