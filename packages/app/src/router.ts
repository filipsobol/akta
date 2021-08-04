import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router';

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

  return _createRouter({
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
};
