import { render } from './render';

export async function renderRoute({
  url,
  createApp,
  template,
  manifest = {},
}) {
  const {
    appHtml,
    headTags,
    htmlAttrs,
    bodyAttrs
  } = await render({
    url,
    context: createApp(),
    manifest
  });

  return template
    .replace('data-html-attrs', htmlAttrs)
    .replace('data-body-attrs', bodyAttrs)
    .replace('<!--head-tags-->', headTags)
    .replace(`<!--app-html-->`, appHtml);
}
