module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    /**
     * @see {@link https://github.com/prettier/eslint-config-prettier}
     */
    'prettier',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // rules for import
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    'import/prefer-default-export': ['off'],
    'import/extensions': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    // additional rules
    'consistent-return': ['off'],
    'default-case': ['off'],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': ['error', { allow: ['error'] }],
  },
  overrides: [
    {
      files: ['*.{ts,tsx}'],
      extends: [
        /**
         * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/eslint-recommended.ts}
         */
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      rules: {
        // rule for .ts
        '@typescript-eslint/no-empty-interface': ['off'],
        // rules for d.ts
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
      },
    },
  ],
};
