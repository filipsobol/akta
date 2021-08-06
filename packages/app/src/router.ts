import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router';

export function createRouter(isClient: boolean, pages) {
  const routes: RouteRecordRaw[] = Object.entries(pages).map(([ path, component ]) => {
    // @ts-ignore
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
      component: async () => component
    } as RouteRecordRaw;
  });

  return _createRouter({
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
};
