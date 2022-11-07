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

const detectProjectEnvironment = (): Maybe<TaskRunnerEnvironment> => {
  const hasYarn = fs.existsSync(path.join(process.cwd(), 'yarn.lock'));
  const hasNpm = fs.existsSync(path.join(process.cwd(), 'package-lock.json'));
  const hasPnpm = fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'));
  const hasDeno = fs.existsSync(path.join(process.cwd(), 'deps.ts'));

  if (hasYarn) {
    return TaskRunnerEnvironment.yarn;
  }

  if (hasNpm) {
    return TaskRunnerEnvironment.npm;
  }

  if (hasPnpm) {
    return TaskRunnerEnvironment.pnpm;
  }

  if (hasDeno) {
    return TaskRunnerEnvironment.deno;
  }

  return null;
};

console.log('project environment', detectProjectEnvironment());
