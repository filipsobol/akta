import { Component } from 'vue';

export interface AktaAppParams {
  App: Component;
  routes: any;
  fn?: () => Promise<void>;
}
