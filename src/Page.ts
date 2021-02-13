import marked from 'marked';
import matter from 'gray-matter';

class Page {
  title: string = '';
  content: string = '';
  createdAt: string = '';
  layout: string = '';

  static fromDefinition(pageDefinition: string): Page {
    const page = new Page();
    const parsedDef = matter(pageDefinition);

    page.title = parsedDef.data.title;
    page.content = marked(parsedDef.content);
    page.createdAt = parsedDef.data.createdAt;
    page.layout = parsedDef.data.layout ?? 'post';

    return page;
  }
}

export default Page;
