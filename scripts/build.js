const { resolve, extname } = require('path');
const rimraf = require('rimraf');
const { default: RawPlugin } = require('esbuild-plugin-raw');
const { build } = require('esbuild');

function cwdResolve(name) {
  return resolve(process.cwd(), name);
}

const pkg = require(cwdResolve('package.json'));
const isESM = extname(pkg.main) === '.mjs';

// Remove old build
rimraf.sync(cwdResolve('dist'));

build({
  entryPoints: [
    cwdResolve('src/index.ts')
  ],
  outdir: 'dist',
  format: isESM ? 'esm' : 'cjs',
  outExtension: isESM ? { '.js': '.mjs' } : {},
  bundle: true,
  sourcemap: true,
  platform: 'node',
  target: 'node16',
  watch: process.argv.includes('--watch'),
  logLevel: 'warning',
  external: [
    'virtual:routes',
    ...Object.keys((pkg.dependencies || {})),
  ],
  plugins: [
    RawPlugin()
  ]
});