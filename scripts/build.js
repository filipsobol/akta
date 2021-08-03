const cwdResolve = name => path.resolve(process.cwd(), name);

const path = require('path');
const rimraf = require('rimraf');
const esbuild = require('esbuild');
const pkg = require(cwdResolve('package.json'));

// Remove old build
rimraf.sync(cwdResolve('dist'));

const isESM = pkg.type === 'module';

esbuild.build({
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
  external: Object.keys(pkg.dependencies)
});