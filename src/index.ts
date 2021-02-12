#!/usr/bin/env node

import path from 'path';
import chokidar from 'chokidar';

import { Command } from 'commander';
import { createServer } from 'http-server';

import SiteGenerator from './SiteGenerator';

async function main() {
  const program = new Command();
  program
    .version('0.0.1');

  program
    .command('build <site-directory> [output-directory]')
    .description('build site from layout and templates')
    .action((src, dst) => build(src, dst));

  program
    .command('watch <site-directory> [output-directory]')
    .description('serve static site from directory')
    .action((dir, port) => watch(dir, port));

  program
    .command('serve <directory> [port]')
    .description('serve static site from directory')
    .action((dir, port) => serve(dir, port))

  program.parse(process.argv);
}

async function build(src: string, dst: string) {
  const siteDir: string = src ?? './';
  const outputDir: string = dst ?? path.join(siteDir, 'out');

  const defaultSiteConfig = {
    layoutDir: path.join(siteDir, 'layouts'),
    pagesDir: path.join(siteDir, 'pages'),
    staticDir: path.join(siteDir, 'static'),
    outputDir
  };

  const generator = new SiteGenerator(defaultSiteConfig);
  await generator.generate();
}

async function watch(src: string, dst: string) {
  let isBuilding = false;
  async function handler() {
    if (isBuilding) { return; }

    isBuilding = true;
    await build(src, dst);
    isBuilding = false;
  };

  chokidar
    .watch(src)
    .on('all', handler);
}

async function serve(root: string, host: string = 'localhost', port: number = 7845) {
  const server = createServer({ root });
  server.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`Started http server: http://${host}:${port}`);
  })
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
