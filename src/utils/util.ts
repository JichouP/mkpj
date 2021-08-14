import childProcess from 'child_process';
import { readFile } from 'fs';
import deepmerge from 'deepmerge';
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

export const parsePackageJSON = (
  preset: Mkpj.Preset,
  type: Mkpj.Type,
  option: Mkpj.Option
): Promise<Record<string, unknown>> =>
  new Promise((resolve, reject) => {
    readFile(
      `${__dirname}/presets/${preset}/${type}/${option}/package.json`,
      'utf8',
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(data));
      }
    );
  });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mergePackageJSON = async (
  config: [Mkpj.Preset, Mkpj.Type, Mkpj.Option][]
) =>
  sort(
    deepmerge.all(await Promise.all(config.map((v) => parsePackageJSON(...v))))
  );
