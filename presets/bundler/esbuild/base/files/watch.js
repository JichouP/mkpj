const path = require('path');
const esbuild = require('esbuild');

esbuild.build({
  bundle: true,
  entryPoints: {
    main: path.resolve('src', 'main.ts'),
  },
  outdir: 'dist',
  watch: true,
  platform: 'node',
  target: 'es2021',
});
