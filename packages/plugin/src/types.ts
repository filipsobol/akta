import type { RouteRecordRaw } from 'vue-router';

export type MaybePromise<T> = T | Promise<T>;

export interface RoutingPluginParameters {
  path: string;
  extensions: string[],
  exclude: string[];
  onRoutesGenerated?: (routes: RouteRecordRaw[]) => MaybePromise<RouteRecordRaw[] | void>;
  onCodeGenerated?: (code: string) => MaybePromise<string | void>;
}
