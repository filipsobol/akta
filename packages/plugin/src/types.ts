import { Routes } from '@akta/app';

export type MaybePromise<T> = T | Promise<T>;

export interface PagesPluginParameters {
  paths: string[];
  extensions: string[],
  exclude: string[];
  onRoutesGenerated?: (routes: Routes) => MaybePromise<Routes | void>;
  onCodeGenerated?: (code: string) => MaybePromise<string | void>;
}
