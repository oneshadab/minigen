#!/usr/bin/env node

import path from 'path';
import { Command } from 'commander';

import SiteGenerator from './SiteGenerator';

async function main() {
  const program = new Command();
  program
    .version('0.0.1')
    .command('build <site-directory> [output-directory]')
    .description('build site from layout and templates')
    .action((src, dst) => build(src, dst));

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

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
