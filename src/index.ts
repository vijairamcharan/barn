#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

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

const getPackageJsonScripts = (): Maybe<Record<string, string>> => {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJsonScripts = JSON.parse(packageJson).scripts;
    return packageJsonScripts;
  } catch (e) {
    return null;
  }
};

const program = () => {
  const args = process.argv.slice(2);

  const processName =
    args[0] === 'create' ? 'pnpm' : detectProjectEnvironment();
  if (!processName) {
    console.warn('No task runner detected');
    return;
  }

  const packageJsonScripts = getPackageJsonScripts();
  const script = packageJsonScripts?.[args[0]];

  const childArgs = script ? ['run', ...args] : args;

  const childProcess = spawn(processName, childArgs, {
    stdio: [process.stdin, process.stdout, process.stderr],
  });

  childProcess.on('exit', function () {
    process.exit();
  });
};

program();
