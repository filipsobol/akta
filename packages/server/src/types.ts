import { AktaContext } from '@akta/app';

export interface RenderParameters {
  url: string;
  context: AktaContext;
  manifest: Record<string, string[]>;
}

export interface CreateAppParameters {
  root: string;
  optionsPath: string;
}

export interface AddPreloadLinksParameters {
  context: AktaContext;
  modules: Set<string>;
  manifest: Record<string, string[]>;
}
