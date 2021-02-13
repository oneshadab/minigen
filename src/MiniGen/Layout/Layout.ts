import handlebars from 'handlebars';
import Page from '../Page/Page';
import Site from '../Site/Site';

class Layout {
  template?: handlebars.TemplateDelegate<any>

  static fromDefinition(layoutDefinition: string) {
    const layout = new Layout();
    layout.template = handlebars.compile(layoutDefinition);
    return layout;
  }

  render(site: Site, page: Page): string {
    if (!this.template) {
      throw new Error('No template specified for render');
    }

    return this.template({ site, page });
  }
}

export default Layout;
