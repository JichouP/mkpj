import childProcess from 'child_process';
import { readFile, writeFile, readdir } from 'fs/promises';
import deepmerge from 'deepmerge';
import { copy } from 'fs-extra';
import sort from 'sort-package-json';
import { PromptResult } from '@/zod';

export const isValidPM = async (pm: PromptResult['pm']): Promise<boolean> => {
  if (pm === 'npm') {
    return true;
  }
  return new Promise((resolve, reject) => {
    childProcess.exec(`${pm} --version`, (err) => {
      if (err) {
        reject(new Error(`${pm} not found`));
        return;
      }
      resolve(true);
    });
  });
};

// package.json

const parseOriginalPackageJSON = async (): Promise<Record<string, unknown>> =>
  JSON.parse(
    await readFile(`${process.cwd()}/package.json`, 'utf8').catch(() => '{}')
  ) as Record<string, unknown>;

const parsePackageJSON = async (
  preset: Mkpj.Preset,
  type: Mkpj.Type,
  option: Mkpj.Option
): Promise<Record<string, unknown>> =>
  JSON.parse(
    await readFile(
      `${__dirname}/presets/${preset}/${type}/${option}/package.json`,
      'utf8'
    ).catch(() => '{}')
  ) as Record<string, unknown>;

export const mergePackageJSON = async (
  config: [Mkpj.Preset, Mkpj.Type, Mkpj.Option][]
): Promise<Record<string, unknown>> =>
  sort(
    deepmerge.all(
      await Promise.all(
        config
          .map((v) => parsePackageJSON(...v))
          .concat(parseOriginalPackageJSON())
      )
    )
  ) as Record<string, unknown>;

export const savePackageJSON = async (
  obj: Record<string, unknown>
): Promise<void> => {
  const json = JSON.stringify(obj, null, 2);
  await writeFile(`${process.cwd()}/package.json`, json, 'utf8');
};

// tsconfig.json

const parseTsConfigJSON = async (
  preset: Mkpj.Preset,
  type: Mkpj.Type,
  option: Mkpj.Option
): Promise<Record<string, unknown>> =>
  JSON.parse(
    await readFile(
      `${__dirname}/presets/${preset}/${type}/${option}/tsconfig.json`,
      'utf8'
    ).catch(() => '{}')
  ) as Record<string, unknown>;

export const mergeTsConfigJSON = async (
  config: [Mkpj.Preset, Mkpj.Type, Mkpj.Option][]
): Promise<Record<string, unknown>> =>
  deepmerge.all(
    await Promise.all(config.map((v) => parseTsConfigJSON(...v)))
  ) as Record<string, unknown>;

export const saveTsConfigJSON = async (
  obj: Record<string, unknown>
): Promise<void> => {
  const json = JSON.stringify(obj, null, 2);
  await writeFile(`${process.cwd()}/tsconfig.json`, json, 'utf8');
};

// babel.config.json

const parseBabelConfigJSON = async (
  preset: Mkpj.Preset,
  type: Mkpj.Type,
  option: Mkpj.Option
): Promise<Record<string, unknown>> =>
  JSON.parse(
    await readFile(
      `${__dirname}/presets/${preset}/${type}/${option}/babel.config.json`,
      'utf8'
    ).catch(() => '{}')
  ) as Record<string, unknown>;

export const mergeBabelConfigJSON = async (
  config: [Mkpj.Preset, Mkpj.Type, Mkpj.Option][]
): Promise<Record<string, unknown>> =>
  sort(
    deepmerge.all(
      await Promise.all(config.map((v) => parseBabelConfigJSON(...v)))
    )
  ) as Record<string, unknown>;

export const saveBabelConfigJSON = async (
  obj: Record<string, unknown>
): Promise<void> => {
  const json = JSON.stringify(obj, null, 2);
  await writeFile(`${process.cwd()}/babel.config.json`, json, 'utf8');
};

// git init

export const gitInit = async (): Promise<void> =>
  new Promise((resolve, reject) => {
    childProcess.exec(`git init`, (err) => {
      if (err) {
        reject(new Error(`git init failed`));
      }
      resolve();
    });
  });

// npm init

export const npmInit = (): Promise<void> =>
  new Promise((resolve, reject) => {
    childProcess.exec('npm init -y', (err) => {
      if (err) {
        reject(new Error(`npm init failed`));
      }
      resolve();
    });
  });

// npm install

export const npmi = async (
  pm: PromptResult['pm'],
  dependencies: string[]
): Promise<void> =>
  new Promise((resolve, reject) => {
    childProcess.exec(
      `${pm} ${pm === 'yarn' ? 'add' : 'i'} ${dependencies.join(' ')}`,
      {
        cwd: process.cwd(),
      },
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });

// npm install -D

export const npmiD = async (
  pm: PromptResult['pm'],
  devDependencies: string[]
): Promise<void> =>
  new Promise((resolve, reject) => {
    childProcess.exec(
      `${pm} ${pm === 'yarn' ? 'add' : 'i'} -D ${devDependencies.join(' ')}`,
      {
        cwd: process.cwd(),
      },
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });

export const npmCommand = async (
  pm: PromptResult['pm'],
  cmd: string
): Promise<void> =>
  new Promise((resolve, reject) => {
    childProcess.exec(
      `${pm} ${cmd}`,
      {
        cwd: process.cwd(),
      },
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });

const copyFile = async (
  preset: Mkpj.Preset,
  type: Mkpj.Type,
  option: Mkpj.Option
) => {
  const res = await readdir(
    `${__dirname}/presets/${preset}/${type}/${option}/files`
  ).catch(() => []);
  if (res.length === 0) {
    return;
  }
  await copy(
    `${__dirname}/presets/${preset}/${type}/${option}/files`,
    process.cwd(),
    {
      overwrite: true,
    }
  ).catch(console.error);
};

export const copyFiles = async (
  config: [Mkpj.Preset, Mkpj.Type, Mkpj.Option][]
): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for (const v of config) {
    // eslint-disable-next-line no-await-in-loop
    await copyFile(...v);
  }
};

export const copyGitIgnore = async (): Promise<void> => {
  await copy(
    `${__dirname}/presets/gitignore/.gitignore`,
    `${process.cwd()}/.gitignore`
  ).catch(console.error);
};
