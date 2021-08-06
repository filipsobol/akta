import { Configuration } from "src/types";

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
