declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}

declare module '*.md' {
  import { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}


declare module 'virtual:routes' {
  import { PagesPluginRoute } from '@akta/plugin';
  const routes: PagesPluginRoute[];
  export default routes;
}

declare module 'virtual:notifier' {
  const routes;
  export default routes;
}
