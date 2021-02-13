
import path from 'path';
import chokidar from 'chokidar';
import { createServer } from 'http-server';

import SiteGenerator from './SiteGenerator';

export module MiniGen {
  export async function build(src: string, dst: string) {
    const siteDir: string = src ?? './';
    const outputDir: string = dst ?? path.join(siteDir, 'out');

    const defaultSiteConfig = {
      title: 'Site',
      baseUrl: 'http://localhost:7845',

      layoutDir: path.join(siteDir, 'layouts'),
      pagesDir: path.join(siteDir, 'pages'),
      staticDir: path.join(siteDir, 'static'),
      outputDir
    };

    const generator = new SiteGenerator(defaultSiteConfig);
    await generator.generate();
  }

  export async function watch(src: string, dst: string) {
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

  export async function serve(root: string, host: string = 'localhost', port: number = 7845) {
    const server = createServer({ root });
    server.listen(port, host, () => {
      // eslint-disable-next-line no-console
      console.log(`Started http server: http://${host}:${port}`);
    })
  }
}
