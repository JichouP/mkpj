const path = require('path');
const esbuild = require('esbuild');
const fs = require('fs-extra');

const copyPlugin = {
  name: 'copy',
  setup(build) {
    build.onStart(() => {
      fs.copy('public', 'dist', { recursive: true });
    });
  },
};

esbuild.build({
  bundle: true,
  entryPoints: {
    index: path.resolve('src', 'index.tsx'),
  },
  outdir: 'dist',
  minify: true,
  platform: 'node',
  target: 'es2021',
  plugins: [copyPlugin],
});
