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
    main: path.resolve('src', 'main.ts'),
    renderer: path.resolve('src', 'renderer.tsx'),
  },
  outdir: 'dist',
  minify: true,
  platform: 'node',
  target: 'es2021',
  plugins: [copyPlugin],
  external: ['electron'],
});
