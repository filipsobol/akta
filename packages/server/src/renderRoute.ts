export async function renderRoute({
  url,
  render,
  manifest,
  createApp,
  template
}) {
  const {
    appHtml,
    preloadLinks,
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
    .replace(`<!--preload-links-->`, preloadLinks)
    .replace(`<!--app-html-->`, appHtml);
}
