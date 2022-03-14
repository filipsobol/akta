import { Command } from 'commander';
import { build } from '@akta/server';

export function buildCommand(): Command {
  const command = new Command('build');

  command
    .description('Build SSR application in production mode')
    .option('-c, --config <path>', 'Set configuration path', 'akta.config.ts')
    .action(action);
  
  return command;
}

async function action(options: Record<string, any>): Promise<void> {
  const root = process.cwd();

  await build({
    root,
    optionsPath: options.config
  });
}
