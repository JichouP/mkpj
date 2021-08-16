// child.execFileSync(`${__dirname}/presets/git-hooks/husky/base/init.sh`);

import { processing } from './processing';
import { prompt } from './prompt';
import { promptValidator } from './zod';

prompt()
  .then((res) => {
    const validationResult = promptValidator.parse(res);
    return processing(validationResult);
  })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .catch(() => {});
