const path = require('path');
const esbuild = require('esbuild');
const fs = require('fs-extra');

const copyPlugin = {
  name: 'copy',
  setup(build) {
    build.onStart(async () => {
      await fs.rm('dist/presets', { recursive: true });
      await fs.copy('presets', 'dist/presets', { recursive: true });
    });
  },
};

esbuild.build({
  bundle: true,
  entryPoints: {
    bin: path.resolve('src', 'bin.ts'),
  },
  outdir: 'dist',
  minify: true,
  platform: 'node',
  target: 'es2021',
  plugins: [copyPlugin],
});
