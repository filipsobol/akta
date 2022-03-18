import type { Plugin } from 'vite';
import PingTemplate from './notifier-ping.ts?raw';

const VIRTUAL_MODULE_ID = '/virtual:ping';

export function PingPlugin(): Plugin {
  return {
    name: 'virtual:ping',

    apply: 'serve',

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return id;
      }

      return;
    },

    load(id: string) {
      if (id !== VIRTUAL_MODULE_ID) {
        return;
      }

      return PingTemplate;
    },

    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'module', src: VIRTUAL_MODULE_ID },
        }
      ]
    },

    handleHotUpdate({ server }) {
      server.ws.send({
        type: 'custom',
        event: 'notify'
      });
    }
  };
}
