#!/usr/bin/env node

import { Command } from 'commander';
import { MiniGen } from './MiniGen';

async function main() {
  const program = new Command();
  program
    .version(process.env.npm_package_version || '0.0.1');

  program
    .command('build <site-directory> [output-directory]')
    .description('build site from layout and templates')
    .action((src, dst) => MiniGen.build(src, dst));

  program
    .command('watch <site-directory> [output-directory]')
    .description('watch for changes and')
    .action((dir, port) => MiniGen.watch(dir, port));

  program
    .command('serve <directory> [port]')
    .description('serve static site from directory')
    .action((dir, port) => MiniGen.serve(dir, port))

  program.parse(process.argv);
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
