import prompts from 'prompts';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const prompt = () =>
  prompts([
    {
      name: 'pm',
      type: 'select',
      message: 'Choose a package manager',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' },
        { title: 'pnpm', value: 'pnpm' },
      ],
    },
    {
      name: 'preset',
      type: 'select',
      message: 'Choose a preset',
      choices: [
        { title: 'Node', value: 'node' },
        { title: 'React', value: 'react' },
        { title: 'Express', value: 'express' },
        { title: 'Electron', value: 'electron' },
      ],
    },
    {
      name: 'mongo',
      type: (prev) => prev === 'express' && 'toggle',
      message: 'Use MongoDB?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'bundler',
      type: 'select',
      message: 'Choose a module bundler',
      choices: [
        { title: 'Webpack', value: 'webpack' },
        { title: 'ESBuild', value: 'esbuild' },
        { title: 'Parcel', value: 'parcel' },
        { title: 'None', value: null },
      ],
    },
    {
      name: 'linter',
      type: 'select',
      message: 'Choose a linter',
      choices: [
        { title: 'ESLint', value: 'eslint' },
        { title: 'None', value: null },
      ],
    },
    {
      name: 'formatter',
      type: 'select',
      message: 'Choose a formatter',
      choices: [
        { title: 'Prettier', value: 'prettier' },
        { title: 'None', value: null },
      ],
    },
    {
      name: 'git-hooks',
      type: 'select',
      message: 'Choose a git-hooks',
      choices: [
        { title: 'husky', value: 'husky' },
        { title: 'None', value: null },
      ],
    },
    {
      name: 'test',
      type: 'select',
      message: 'Choose a test tool',
      choices: [
        { title: 'jest', value: 'jest' },
        { title: 'None', value: null },
      ],
    },
  ]);

/*
npm
typescript
webpack
git-hooks
prettier
eslint
jest
*/
