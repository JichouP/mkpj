// validationResultを元に処理する

import { SpinnerHandler } from './spinner';
import {
  copyFiles,
  isValidPM,
  mergePackageJSON,
  mergeTsConfigJSON,
  npmi,
  npmiD,
  npmInit,
  savePackageJSON,
  saveTsConfigJSON,
} from './utils/util';
import { PromptResult } from './zod';

export const processing = async (prompt: PromptResult): Promise<void> => {
  const spinner = new SpinnerHandler();
  spinner.start();

  const { pm, preset, react, mongo, bundler, eslint, prettier, husky, test } =
    prompt;

  // npm以外は存在確認
  spinner.setText(`Validate Package Manager: ${pm}`);
  await isValidPM(pm);

  // configを作成
  const config: [Mkpj.Preset, Mkpj.Type, Mkpj.Option][] = [
    ['main', preset, 'base'],
    ['typing', 'typescript', 'base'],
  ];
  if (mongo) config.push(['main', 'mongo', 'base']);
  if (bundler)
    config.push(['bundler', bundler, 'base'], ['bundler', bundler, preset]);
  if (eslint) config.push(['linter', 'eslint', eslint]);
  if (prettier) config.push(['formatter', 'prettier', 'base']);
  if (husky) config.push(['git-hooks', 'husky', 'base']);
  if (test) config.push(['test', 'jest', preset]);
  if (test && mongo) config.push(['test', 'jest', 'mongo']);

  // すべてのpackage.jsonを合成
  const { dependencies, devDependencies, ...rest } = await mergePackageJSON(
    config
  );

  // package.jsonを保存
  spinner.setText(`Save Package.json`);
  await npmInit();
  await savePackageJSON(rest);

  // npm install
  spinner.setText(`Install Dependencies`);
  if (dependencies && typeof dependencies === 'object') {
    await npmi(pm, Object.keys(dependencies));
  }
  spinner.setText(`Install Dev Dependencies`);
  if (devDependencies && typeof devDependencies === 'object') {
    await npmiD(pm, Object.keys(devDependencies));
  }

  // tsconfig.jsonを作成
  spinner.setText(`Create tsconfig.json`);
  const tsconfig: [Mkpj.Preset, Mkpj.Type, Mkpj.Option][] = [
    ['typing', 'typescript', 'base'],
    ['typing', 'typescript', 'alias'],
  ];
  if (preset === 'react' || react)
    tsconfig.push(['typing', 'typescript', 'react']);
  await saveTsConfigJSON(await mergeTsConfigJSON(tsconfig));

  // ファイルをコピー
  spinner.setText(`Copy Files`);
  await copyFiles(config);
  spinner.done();
};
