import { Command } from 'commander';
import { build, prerender } from '@akta/server';

export function createBuild(program: Command): void {
  program
    .command('build')
    .description('Build Akta application in production mode')
    .action(command);
}

async function command() {
  await build({
    root: process.cwd(),
    production: true
  });

  await prerender({
    root: process.cwd(),
    production: true
  });

  console.log('Pre-rendering complete');
}
