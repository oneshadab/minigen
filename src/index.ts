import SiteGenerator from './SiteGenerator';

async function main() {
  const generator = new SiteGenerator({
    layoutDir: 'sample/layout',
    pagesDir: 'sample/pages',
    outputDir: 'sample/out',
  });

  generator.generate();
}

main();
