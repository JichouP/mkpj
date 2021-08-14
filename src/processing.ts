// validationResultを元に処理する

import { isValidPM, mergePackageJSON } from './utils/util';
import { PromptResult } from './zod';

export const processing = async (prompt: PromptResult): Promise<void> => {
  const { pm, preset, mongo, bundler, eslint, prettier, husky, test } = prompt;
  await isValidPM(pm);
  const config: [Mkpj.Preset, Mkpj.Type, Mkpj.Option][] = [];
  config.push(['main', preset, 'base']);
  if (mongo) config.push(['main', 'mongo', 'base']);
  if (bundler) config.push(['bundler', bundler, 'base']);
  if (eslint) config.push(['linter', 'eslint', eslint]);
  if (prettier) config.push(['formatter', 'prettier', 'base']);
  if (husky) config.push(['git-hooks', 'lint-staged', 'base']);
  if (test) config.push(['test', 'jest', preset]);
  if (test && mongo) config.push(['test', 'jest', 'mongo']);
  const merged = mergePackageJSON(config);
  // eslint-disable-next-line no-console
  console.log(merged);
};
