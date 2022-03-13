import { Command } from 'commander';
import { createServer } from '@akta/server';

export function createDev(program: Command): void {
  program
    .command('dev')
    .description('Start Akta application in development mode')
    .action(() => command(program));
}

async function command(program: Command) {
  const root = process.cwd();
  const port = program.opts().port;

  const { server } = await createServer({
    root,
    production: false
  });

  server.listen(
    port,
    () => console.log(`Akta server is running at http://localhost:${ port }`)
  );
}
