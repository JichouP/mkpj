# mkpj

Project initialization tool that does not hide configuration files.
You can easily edit the configuration file by yourself.

## Usage

```
cd /path/to/project
npx mkpj
```

## Presets

You can use the following presets

- Node
- React
- Express
  - MongoDB(optional)
- Electron

### Module Bundler

- webpack
- esbuild
- ts-node

### Linter(ESLint)

- eslint:recommended
- airbnb
- airbnb-base

### Formatter

- Prettier

### Git Hooks

- husky + lint-staged

### Test

- Jest
  - jest-coverage-badges
  - sinon-express-mock
  - supertest
  - @shelf/jest-mongodb
  - react-test-renderer
