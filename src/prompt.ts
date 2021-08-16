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
      name: 'react',
      type: (prev) => prev === 'electron' && 'toggle',
      message: 'Use React?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
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
      type: 'toggle',
      message: 'Use Module Bundler?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'bundler',
      type: (prev) => (prev ? 'select' : false),
      message: 'Choose a module bundler',
      choices: (_, values) => {
        const choices = [
          { title: 'Webpack', value: 'webpack' },
          { title: 'ESBuild', value: 'esbuild' },
        ];
        if (['node', 'express'].includes(values.preset)) {
          choices.push({ title: 'ts-node', value: 'ts-node' });
        }
        return choices;
      },
    },
    {
      name: 'eslint',
      type: 'toggle',
      message: 'Use ESLint?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'eslint',
      type: (prev) => (prev ? 'select' : false),
      message: 'Choose a ESLint preset',
      choices: [
        { title: 'eslint:recommended', value: 'eslint:recommended' },
        { title: 'airbnb (with React)', value: 'airbnb' },
        { title: 'airbnb-base (without React)', value: 'airbnb-base' },
      ],
    },
    {
      name: 'prettier',
      type: 'toggle',
      message: 'Use Prettier?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'husky',
      type: 'toggle',
      message: 'Use husky?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'test',
      type: 'toggle',
      message: 'Use Jest?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
  ]);
