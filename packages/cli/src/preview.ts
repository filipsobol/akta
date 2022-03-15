import { Command } from 'commander';
import { createPreviewServer } from '@akta/server';

export function previewCommand(): Command {
  const command = new Command('preview');

  command
    .description('Preview already prerendered application')
    .option('-p, --port <port>', 'Which port to use', '3000')
    .action(action);

  return command;
}

async function action(options: Record<string, any>): Promise<void> {
  const server = await createPreviewServer(process.cwd());

  server.listen(
    options.port,
    (err, address) => {
      err
        ? console.error(err)
        : console.log(`Akta server is running at ${ address }`);
    }
  );
}
