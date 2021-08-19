// child.execFileSync(`${__dirname}/presets/git-hooks/husky/base/init.sh`);

import { program } from 'commander';
import { version } from '../package.json';
import { processing } from './processing';
import { prompt } from './prompt';
import { promptValidator } from './zod';

// commander の program.versionにpackage.jsonのversionを設定
program.version(version, '-v --version').parse();

prompt()
  .then((res) => {
    const validationResult = promptValidator.parse(res);
    return processing(validationResult);
  })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .catch(() => {});
