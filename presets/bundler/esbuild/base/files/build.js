const path = require('path');
const esbuild = require('esbuild');

esbuild.build({
  bundle: true,
  entryPoints: {
    main: path.resolve('src', 'main.ts'),
  },
  outdir: 'dist',
  minify: true,
  platform: 'node',
  target: 'es2021',
});
