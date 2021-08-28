import { Command } from 'commander';
import { createServer, loadApplication } from '@akta/server';

export function createDev(program: Command): void {
  program
    .command('dev')
    .description('Start Akta application in development mode')
    .action(command);
}

async function command() {
  const root = process.cwd();
  const production = false;

  const { server, vite } = await createServer({
    root,
    production
  });

  const { configuration } = await loadApplication({
    vite,
    root,
    production
  });

  const port = configuration.server.port;

  server.listen(
    port,
    () => console.log(`Akta server is running at http://localhost:${ port }`)
  );
}
