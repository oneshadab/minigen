import SiteGenerator from './SiteGenerator';

async function main() {
  const generator = new SiteGenerator({
    layoutDir: 'sample/layouts',
    pagesDir: 'sample/pages',
    outputDir: 'sample/out',
  });

  generator.generate();
}

main();
