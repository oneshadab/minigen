import path from 'path';
import { Command } from 'commander';

import SiteGenerator from './SiteGenerator';

async function main() {
  const program = new Command();
  program
    .version('0.0.1')
    .option('-w, --watch', 'watch for changes')
    .option('-d, --dir', 'site directory');
  program.parse(process.argv);

  const argOptions = program.opts();

  const siteDir: string = argOptions.dir ?? 'example';
  const siteConfig = {
    layoutDir: path.join(siteDir, 'layouts'),
    pagesDir: path.join(siteDir, 'pages'),
    outputDir: path.join(siteDir, 'out'),
    staticDir: path.join(siteDir, 'static'),
  };

  const generator = new SiteGenerator(siteConfig);

  await generator.generate();
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
