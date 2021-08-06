import { Command } from 'commander';
import { createServer } from '@akta/server';

export function createDev(program: Command): void {
  program
    .command('dev')
    .description('Start Akta application in development mode')
    .action(async (parameters) => await dev(parameters, program));
}

async function dev(parameters: Record<string, string>, program: Command) {
  const options = {
    ...parameters,
    ...program.opts()
  };

  console.log({
    options
  });

  const { app } = await createServer({
    root: process.cwd()
  });

  app.listen(3000, () => console.log('http://localhost:3000'));
}
