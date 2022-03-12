import { ref } from 'vue';
import { extname } from 'path';
import { renderHeadToString } from '@vueuse/head';
import { renderToString, SSRContext } from '@vue/server-renderer';
import { AddPreloadLinksParameters, RenderParameters } from './types';

export async function render({ url, context, manifest }: RenderParameters) {
  // set the router to the desired URL before rendering
  context.router.push(url);
  await context.router.isReady();

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx: SSRContext = {};
  const appHtml = await renderToString(context.app, ctx);

  addPreloadLinks({
    context,
    modules: ctx.modules,
    manifest
  });

  const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(context.head);

  return {
    appHtml,
    headTags,
    htmlAttrs,
    bodyAttrs
  };
}

const preloadExtensionMap = {
  '.js': {
    rel: 'modulepreload',
    crossorigin: ''
  },
  '.css': {
    rel: 'stylesheet',
  },
  '.woff': {
    rel: 'preload',
    as: 'font',
    type: 'font/woff',
    crossorigin: ''
  },
  '.woff2': {
    rel: 'preload',
    as: 'font',
    type: 'font/woff2',
    crossorigin: ''
  },
  '.gif': {
    rel: 'preload',
    as: 'image',
    type: 'image/gif',
    crossorigin: ''
  },
  '.jpg': {
    rel: 'preload',
    as: 'image',
    type: 'image/jpeg',
    crossorigin: ''
  },
  '.jpeg': {
    rel: 'preload',
    as: 'image',
    type: 'image/jpeg',
    crossorigin: ''
  },
  '.png': {
    rel: 'preload',
    as: 'image',
    type: 'image/png',
    crossorigin: ''
  },
  '.webp': {
    rel: 'preload',
    as: 'image',
    type: 'image/webp',
    crossorigin: ''
  }
};

function addPreloadLinks({
  context,
  modules,
  manifest
}: AddPreloadLinksParameters) {
  const link = Array
    .from(modules) // Convert Set to Array
    .map((module) => manifest[module]) // Get array of assets used in every module
    .reduce((carry, files) => carry.concat(files), []) // Merge assets arrays
    .filter((file, index, files) => files.indexOf(file) === index) // Remove duplicates
    .filter((file) => preloadExtensionMap.hasOwnProperty(extname(file))) // Remove assets that shouldn't be preloaded
    .map((file) => ({
      ...preloadExtensionMap[extname(file)],
      href: file,
    })); // Convert assets URLs into head object acceptable by "@vueuse/head"

  context.head.addHeadObjs(ref({ link }));
}
