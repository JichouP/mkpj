declare namespace Mkpj {
  type Preset =
    | 'bundler'
    | 'formatter'
    | 'git-hooks'
    | 'linter'
    | 'main'
    | 'package-manager'
    | 'test'
    | 'typing';

  type Type =
    | 'esbuild'
    | 'ts-node'
    | 'webpack'
    | 'prettier'
    | 'husky'
    | 'eslint'
    | 'electron'
    | 'express'
    | 'mongo'
    | 'node'
    | 'react'
    | 'npm'
    | 'pnpm'
    | 'yarn'
    | 'jest'
    | 'typescript';

  type Option =
    | 'base'
    | 'electron'
    | 'react'
    | 'airbnb'
    | 'airbnb-base'
    | 'eslint:recommended'
    | 'electron'
    | 'express'
    | 'mongo'
    | 'node'
    | 'react'
    | 'alias';
}
