import path from 'path';
import Vue from '@vitejs/plugin-vue';
import RegisterComponents from 'unplugin-vue-components/vite';
import { PingPlugin } from './ping';
import { RoutingPlugin } from './routing';

export function AktaPlugin() {
  return [
    Vue({
      include: [
        /\.vue$/
      ]
    }),

    PingPlugin(),

    RoutingPlugin({
      path: 'routes',
      extensions: [
        'vue'
      ],
      exclude: []
    }),

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
