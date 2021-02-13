import Page from'./Page';
import Layout from './Layout';

class Site {
  title: String;
  baseUrl: String;
  layouts: Record<string, Layout> = {};
  pages: Record<string, Page> = {};

  constructor(title: string, baseUrl: string) {
    this.title = title;
    this.baseUrl = baseUrl;
  }

  addPage(pageName: string, page: Page) {
    this.pages[pageName] = page;
  }

  addLayout(layoutName: string, layout: Layout) {
    this.layouts[layoutName] = layout;
  }

  renderPage(pageName: string) {
    const page = this.pages[pageName];
    if (!page) {
      throw new Error(`'${pageName}' does not exist`);
    }

    const layoutForPage = this.layouts[page.layout];
    if (!layoutForPage) {
      throw new Error(`No layout names '${page.layout}' found for page '${pageName}'`);
    }

    return layoutForPage.render(this, page);
  }
}

export default Site;
