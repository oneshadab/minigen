import path from 'path';
import SiteGenerator from './SiteGenerator';

async function main() {
  const rootDir = 'example';

  const generator = new SiteGenerator({
    layoutDir: path.join(rootDir, 'layouts'),
    pagesDir: path.join(rootDir, 'pages'),
    outputDir: path.join(rootDir, 'out'),
  });

  generator.generate();
}

main();
