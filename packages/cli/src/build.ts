import { Command } from 'commander';
import { prerender } from '@akta/server';

export function createBuild(program: Command): void {
  program
    .command('build')
    .description('Build Akta application in production mode')
    .action(async (parameters) => await build(parameters, program));
}

async function build(parameters: Record<string, string>, program: Command) {
  const options = {
    ...parameters,
    ...program.opts()
  };

  await prerender({
    root: process.cwd()
  });

  console.log('Pre-rendering complete');
}
