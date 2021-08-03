import { defineConfig } from 'vite';
import Akta from '@akta/plugin';

export default defineConfig({
  server: {
    fs: {
      allow: [
        '..'
      ]
    }
  },
  plugins: [
    Akta()
  ]
});
