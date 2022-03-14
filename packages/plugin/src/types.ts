import { RouteRecordRaw } from 'vue-router';

export type MaybePromise<T> = T | Promise<T>;

export interface PagesPluginParameters {
  paths: string[];
  extensions: string[],
  exclude: string[];
  onRoutesGenerated?: (routes: RouteRecordRaw[]) => MaybePromise<RouteRecordRaw[] | void>;
  onCodeGenerated?: (code: string) => MaybePromise<string | void>;
}

export interface PagesPluginRoute {
  name: string;
  rawPath: string;
  path: string;
  component: Function;
}
