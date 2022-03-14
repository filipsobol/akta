import { Command } from 'commander';
import { build, prerender } from '@akta/server';

export function prerenderCommand(): Command {
  const command = new Command('prerender');

  command
    .description('Build prerendered application in production mode')
    .option('-c, --config <path>', 'Set configuration path', 'akta.config.ts')
    .action(action);
  
  return command;
}

async function action(options: Record<string, any>): Promise<void> {
  const root = process.cwd();

  await build({
    root,
    optionsPath: options.config,
  });

  await prerender(root);

  console.log('Pre-rendering complete');
}
