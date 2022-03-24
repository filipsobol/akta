declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}

declare module 'virtual:routes' {
  import { RoutingPluginRoute } from '@akta/plugin';
  const routes: PagesPluginRoute[];
  export default routes;
}

declare module 'virtual:notifier' {
  const routes;
  export default routes;
}
