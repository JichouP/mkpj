// child.execFileSync(`${__dirname}/presets/git-hooks/husky/base/init.sh`);

import { prompt } from './prompt';
import { promptValidator } from './zod';

prompt()
  .then((res) => {
    const validationResult = promptValidator.safeParse(res);
    // eslint-disable-next-line no-console
    console.log(validationResult);
  })
  .catch(console.error);
