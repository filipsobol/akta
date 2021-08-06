import { Configuration } from '@akta/app';

export const configDefaults: Configuration = {
  title: 'Akta App',
  routes: [],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
};
