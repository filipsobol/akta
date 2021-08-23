import { Command } from 'commander';
import { createServer } from '@akta/server';

export function createDev(program: Command): void {
  program
    .command('dev')
    .description('Start Akta application in development mode')
    .action(async (parameters) => await command(parameters, program));
}

// @ts-ignore
async function command(parameters: Record<string, string>, program: Command) {
  // const options = {
  //   ...parameters,
  //   ...program.opts()
  // };

  const { server } = await createServer({
    root: process.cwd(),
    production: false
  });

  server.listen(3000, () => console.log('http://localhost:3000'));
}
