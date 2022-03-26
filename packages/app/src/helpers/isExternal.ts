export function isExternal(url: string) {
  // https://stackoverflow.com/a/19709846/4617687
  const pattern = new RegExp('^(?:[a-z]+:)?//', 'i');
  return pattern.test(url);
}
