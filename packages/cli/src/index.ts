#!/usr/bin/env node
import { Command } from 'commander';
import { version } from '../package.json';
import { devCommand } from './dev';
import { startCommand } from './start';
import { buildCommand } from './build';
import { previewCommand } from './preview';
import { prerenderCommand } from './prerender';

const program = new Command();

program
  .storeOptionsAsProperties(false)
  .version(version)
  .name('Akta CLI')
  .description('CLI for building, running, and previewing Akta applications')
  .addCommand(devCommand())
  .addCommand(startCommand())
  .addCommand(buildCommand())
  .addCommand(previewCommand())
  .addCommand(prerenderCommand())
  .parseAsync(process.argv);
