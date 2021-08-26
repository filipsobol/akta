import { Command } from 'commander';
import { createServer } from '@akta/server';

export function createDev(program: Command): void {
  program
    .command('dev')
    .description('Start Akta application in development mode')
    .action(command);
}

async function command() {
  const { server, configuration } = await createServer({
    root: process.cwd(),
    production: false
  });

  const port = configuration.server.port;

  server.listen(
    port,
    () => console.log(`Akta server is running at http://localhost:${ port }`)
  );
}
