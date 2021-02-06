import path from 'path';
import Layout from './Layout';
import Page from './Page';
import utils from './utils';

type GeneratorOptions = {
  layoutDir: string,
  pagesDir: string,
  outputDir: string,
}

class SiteGenerator {
  options: GeneratorOptions;
  layouts: Record<string, Layout> = {};
  pages: Record<string, Page> = {};

  constructor(options: GeneratorOptions) {
    this.options = options;
  }

  async generate() {
    await this.loadLayouts();
    await this.loadPages();

    await this.renderSite();
  }

  async loadLayouts() {
    const layoutFiles = await utils.listAllFiles(this.options.layoutDir);

    const promises = layoutFiles.map(async (filepath) => {
      const layoutName = utils.extractFilename(filepath);
      const layoutDefinition = await utils.readFileContent(filepath);

      this.layouts[layoutName] = new Layout(layoutDefinition);
    });

    await Promise.all(promises);
  }

  async loadPages() {
    const pageFiles = await utils.listAllFiles(this.options.pagesDir);

    const promises = pageFiles.map(async (filepath) => {
      const pageName = utils.extractFilename(filepath);
      const pageDefinition = await utils.readFileContent(filepath);

      this.pages[pageName] = new Page(pageDefinition);
    });

    await Promise.all(promises);
  }

  async renderSite() {
    const promises = Object.entries(this.pages).map(async ([pageName, page]) => {
      const targetFile = path.join(this.options.outputDir, `${pageName}.html`);

      const layoutForPage = this.layouts[page.layout];
      if (!layoutForPage) {
        throw new Error(`No layout found for page ${pageName}`);
      }

      const renderedPage = layoutForPage.render(page);

      await utils.writeFileContent(targetFile, renderedPage);
    });

    await Promise.all(promises);
  }
}

export default SiteGenerator;
