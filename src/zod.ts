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
    z.literal(false),
    z.literal('webpack'),
    z.literal('esbuild'),
    z.literal('ts-node'),
  ]),
  eslint: z.union([
    z.literal(false),
    z.literal('eslint:recommended'),
    z.literal('airbnb'),
    z.literal('airbnb-base'),
  ]),
  prettier: z.boolean(),
  husky: z.boolean(),
  test: z.boolean(),
});

export type PromptResult = z.infer<typeof promptValidator>;
