export async function prerender (): Promise<void> {
  // const outDir = resolve(root, configuration.build.outDir);
  
  // const manifest = await import(resolve(outDir, 'static/ssr-manifest.json'));
  // const template = readFileSync(resolve(outDir, 'static/index.html'), 'utf-8');

  // const routesToPrerender = readdirSync(resolve(root, 'pages')).map(file => {
  //   const name = file.replace(/\.(vue|md)$/, '').toLowerCase()
  //   return name === 'index' ? `/` : `/${name}`
  // });

  // for (const url of routesToPrerender) {
  //   const { appHtml, preloadLinks } = await render(url, manifest);

  //   const html = template
  //     .replace(`<!--preload-links-->`, preloadLinks)
  //     .replace(`<!--app-html-->`, appHtml);

  //   const filePath = `static${url === '/' ? '/index' : url}.html`;
  //   writeFileSync(resolve(outDir, filePath), html);
  //   console.log(`Generated ${filePath}`);
  // }

  // unlinkSync(resolve(outDir, 'static/ssr-manifest.json'));
}
