import path from 'path';
import * as esbuild from 'esbuild';
import { copySync, mkdirpSync } from 'fs-extra';
import { series, TaskFunction } from 'gulp';

const makeDistDir: TaskFunction = (done) => {
  mkdirpSync('dist');
  done();
};
makeDistDir.displayName = 'mkdir dist';

const copyPresets: TaskFunction = (done) => {
  copySync('presets', 'dist/presets', { recursive: true });
  done();
};
copyPresets.displayName = 'copy presets';

const bundle: TaskFunction = (done) => {
  esbuild.buildSync({
    bundle: true,
    entryPoints: {
      bin: path.resolve('src', 'bin.ts'),
    },
    outdir: 'dist',
    minify: true,
    platform: 'node',
    target: 'es2021',
  });
  done();
};

export const build = series(makeDistDir, copyPresets, bundle);
