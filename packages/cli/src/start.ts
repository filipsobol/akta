import { Command } from 'commander';
import { createSSRServer } from '@akta/server';

export function startCommand(): Command {
  const command = new Command('start');

  command
    .description('Start already built SSR application in production mode')
    .option('-p, --port <port>', 'Which port to use', '3000')
    .action(action);

  return command;
}

async function action(options: Record<string, any>): Promise<void> {
  const server = await createSSRServer(process.cwd());

  server.listen(
    options.port,
    (err, address) => {
      err
        ? console.error(err)
        : console.log(`Akta server is running at ${ address }`);
    }
  );
}
