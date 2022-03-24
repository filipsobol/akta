#!/usr/bin/env node
import { Command } from 'commander';
import { version } from '../package.json';
import { devCommand } from './dev';
import { startCommand } from './start';
import { buildCommand } from './build';

const program = new Command();

program
  .storeOptionsAsProperties(false)
  .version(version)
  .name('Akta CLI')
  .description('CLI for building and running Akta applications')
  .addCommand(devCommand())
  .addCommand(startCommand())
  .addCommand(buildCommand())
  .parseAsync(process.argv);
