import { Router } from 'vue-router';
import { App, Component } from 'vue';
import { HeadClient } from '@vueuse/head';
export interface AktaAppParams {
    App: Component;
    routes: any;
    fn?: () => Promise<void>;
}
export interface CreateAkta {
    app: App;
    router: Router;
    head: HeadClient;
}
export interface CreateAktaFactory {
    (): CreateAkta;
}
