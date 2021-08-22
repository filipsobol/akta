import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router';
import { Routes } from './types';

export function createRouter(isClient: boolean, routes: Routes) {
  return _createRouter({
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
};
