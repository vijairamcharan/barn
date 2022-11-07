#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

type Maybe<T> = T | null;

enum TaskRunnerEnvironment {
  yarn = 'yarn',
  npm = 'npm',
  pnpm = 'pnpm',
  deno = 'deno',
}

const projectFileExists = (filename: string): boolean =>
  fs.existsSync(path.join(process.cwd(), filename));

const detectProjectEnvironment = (): Maybe<TaskRunnerEnvironment> => {
  const isYarn = projectFileExists('yarn.lock');
  if (isYarn) {
    return TaskRunnerEnvironment.yarn;
  }

  const isNpm = projectFileExists('package-lock.json');
  if (isNpm) {
    return TaskRunnerEnvironment.npm;
  }

  const isPnpm = projectFileExists('pnpm-lock.yaml');
  if (isPnpm) {
    return TaskRunnerEnvironment.pnpm;
  }

  const isDeno = projectFileExists('deps.ts');
  if (isDeno) {
    return TaskRunnerEnvironment.deno;
  }

  return null;
};

console.log('project environment', detectProjectEnvironment());
