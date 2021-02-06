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
    const layoutName = 'post';
    const layoutDefinition = await utils.readFileContent(`sample/layouts/${layoutName}.hbs`);
    this.layouts[layoutName] = new Layout(layoutDefinition);
  }

  async loadPages() {
    const pageName = 'welcome_post';
    const pageDefinition = await utils.readFileContent(`sample/pages/${pageName}.md`);
    this.pages[pageName] = new Page(pageDefinition);
  }

  async renderSite() {
    const promises = Object.entries(this.pages).map(async ([pageName, page]) => {
      const targetFile = path.join(this.options.outputDir, `${pageName}.html`);
      const layoutForPage = this.layouts[page.layout];
      const renderedPage = layoutForPage.render(page);

      await utils.writeFileContent(targetFile, renderedPage);
    });

    await Promise.all(promises);
  }
}

export default SiteGenerator;
