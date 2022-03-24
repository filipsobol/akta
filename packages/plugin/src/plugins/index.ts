import Vue from '@vitejs/plugin-vue';
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
  ];
}
