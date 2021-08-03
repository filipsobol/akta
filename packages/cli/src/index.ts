#!/usr/bin/env node
import { Command } from 'commander';
import { version } from '../package.json';
import { createBuild } from './build';
import { createDev } from './dev';
import { createStart } from './start';

const program = new Command();

program
  .version(version)
  .option('-c, --config <path>', 'Set configuration path', 'akta.config.js')
  .option('-p, --port <port>', 'Which port to use', '3000');

[
  createBuild,
  createDev,
  createStart
].forEach(command => command(program));

program.parseAsync(process.argv);
