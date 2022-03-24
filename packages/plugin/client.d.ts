declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}

declare module 'virtual:routes' {
  import { RouteRecordRaw } from 'vue-router';
  const routes: RouteRecordRaw[];
  export default routes;
}

declare module 'virtual:notifier' {
  const routes;
  export default routes;
}
