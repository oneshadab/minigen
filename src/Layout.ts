import handlebars from 'handlebars';
import Page from './Page';
import Site from './Site';

class Layout {
  template: handlebars.TemplateDelegate<any>

  constructor(layoutDefinition: string) {
    this.template = handlebars.compile(layoutDefinition);
  }

  render(site: Site, page: Page): string {
    return this.template({ site, page });
  }
}

export default Layout;
