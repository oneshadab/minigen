import { Page, Site, Layout } from 'src/MiniGen';

describe('Site class', () => {
  describe('.renderPage', () => {
    let site: Site;

    beforeEach(() => {
      site = new Site('test-title', 'test-url');
    });

    it('should render a page properly', () => {
      const layoutName = 'layout-1';
      const layout = Layout.fromDefinition('content: {{page.content}}');
      site.addLayout(layoutName, layout);

      const pageName = 'page-1';
      const page = new Page();
      page.layout = layoutName;
      page.content = 'test page content';
      site.addPage(pageName, page);

      const renderedPage = site.renderPage(pageName);
      expect(renderedPage)
        .toBe('content: test page content')
    });

    it('should throw error for missing page', () => {
      const pageName = 'unused-page';
      expect(() => site.renderPage(pageName))
        .toThrow(`'${pageName}' does not exist`);
    });

    it('should throw error for missing layout', () => {
      const pageName = 'page-1';
      const page = new Page();
      page.layout = 'missing-layout';
      site.addPage(pageName, page);

      expect(() => site.renderPage(pageName))
        .toThrow(`No layout names '${page.layout}' found for page '${pageName}'`);
    });

  })
})
