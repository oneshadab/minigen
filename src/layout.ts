import handlebars from 'handlebars';
import Page from './page';

class Layout {
  template: handlebars.TemplateDelegate<any>

  constructor(layoutDefinition: string) {
    this.template = handlebars.compile(layoutDefinition);
  }

  render(page: Page): string {
    return this.template({ page });
  }
}

export default Layout;
