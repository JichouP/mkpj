import { z } from 'zod';

export const promptValidator = z.object({
  pm: z.union([z.literal('npm'), z.literal('yarn'), z.literal('pnpm')]),
  preset: z.union([
    z.literal('node'),
    z.literal('react'),
    z.literal('express'),
    z.literal('electron'),
  ]),
  mongo: z.union([z.boolean(), z.undefined()]),
  bundler: z.union([
    z.literal('webpack'),
    z.literal('esbuild'),
    z.literal('parcel'),
    z.null(),
  ]),
  linter: z.union([z.literal('eslint'), z.null()]),
  formatter: z.union([z.literal('prettier'), z.null()]),
  'git-hooks': z.union([z.literal('husky'), z.null()]),
  test: z.union([z.literal('jest'), z.null()]),
});
