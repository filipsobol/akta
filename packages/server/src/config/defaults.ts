import { Configuration } from '@akta/app';

export const configDefaults: Partial<Configuration> = {
  routes: [],
  head: {
    title: 'Akta App',
  },
  server: {
    port: 3000
  }
};
