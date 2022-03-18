import path from 'path';
import Vue from '@vitejs/plugin-vue';
import RegisterComponents from 'unplugin-vue-components/vite';
import { PagesPlugin } from './pages';
import { PingPlugin } from './ping';

export function AktaPlugin() {
  return [
    Vue(),

    PagesPlugin({
      paths: [
        'pages'
      ],
      extensions: [
        'vue'
      ],
      exclude: [],
      onRoutesGenerated: () => {},
      onCodeGenerated: () => {}
    }),

    PingPlugin(),

    RegisterComponents({
      deep: true,
      dirs: [
        path.resolve(process.cwd(), 'components'),
      ],
      extensions: [
        'vue'
      ],
      include: [
        /\.vue$/,
        /\.vue\?vue/
      ],
    }),
  ];
}
