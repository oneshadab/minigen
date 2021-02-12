import path from 'path';
import Layout from './Layout';
import Page from './Page';
import Site from './Site';
import utils from './utils';

type SiteGeneratorConfig = {
  title: string,
  baseUrl: string,

  layoutDir: string,
  pagesDir: string,
  outputDir: string,
  staticDir: string,
};

class SiteGenerator {
  config: SiteGeneratorConfig;
  site: Site;

  constructor(config: SiteGeneratorConfig) {
    this.config = config;
    this.site = new Site(config.title, config.baseUrl);
  }

  async generate() {
    await this.copyStaticAssets();

    await this.loadLayouts();
    await this.loadPages();

    await this.renderSite();
  }

  async loadLayouts() {
    const layoutFiles = await utils.listAllFiles(this.config.layoutDir);

    const promises = layoutFiles.map(async (filepath) => {
      const layoutName = utils.extractFilename(filepath);
      const layoutDefinition = await utils.readFileContent(filepath);

      this.site.layouts[layoutName] = new Layout(layoutDefinition);
    });

    await Promise.all(promises);
  }

  async loadPages() {
    const pageFiles = await utils.listAllFiles(this.config.pagesDir);

    const promises = pageFiles.map(async (filepath) => {
      const pageName = utils.extractFilename(filepath);
      const pageDefinition = await utils.readFileContent(filepath);

      this.site.pages[pageName] = new Page(pageDefinition);
    });

    await Promise.all(promises);
  }

  async renderSite() {
    const promises = Object.entries(this.site.pages).map(async ([pageName, page]) => {
      const targetFile = path.join(this.config.outputDir, `${pageName}.html`);

      const layoutForPage = this.site.layouts[page.layout];
      if (!layoutForPage) {
        throw new Error(`No layout found for page ${pageName}`);
      }

      const renderedPage = layoutForPage.render(this.site, page);
      await utils.writeFileContent(targetFile, renderedPage);
    });

    await Promise.all(promises);
  }

  async copyStaticAssets() {
    const targetDir = path.join(this.config.outputDir, 'static');
    await utils.copyDir(this.config.staticDir, targetDir);
  }
}

export default SiteGenerator;
