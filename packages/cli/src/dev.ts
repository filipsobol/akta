import { Command } from 'commander';
import { createDevelopmentServer } from '@akta/server';

export function devCommand(): Command {
  const command = new Command('dev');

  command
    .description('Start application server in development mode')
    .option('-c, --config <path>', 'Set configuration path', 'akta.config.ts')
    .option('-p, --port <port>', 'Which port to use', '3000')
    .action(action);

  return command;
}

async function action(options: Record<string, any>): Promise<void> {
  const server = await createDevelopmentServer(
    process.cwd(),
    options.config
  );

  server.listen(
    options.port,
    (err, address) => {
      console.log(`Akta server is running at ${ address }`);
    }
  );
}
