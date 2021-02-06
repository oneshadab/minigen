import marked from 'marked';
import matter from 'gray-matter';

class Page {
  title: string;
  content: string;
  createdAt: string;
  layout: string;

  constructor(pageDefinition: string) {
    const parsedDef = matter(pageDefinition);

    this.title = parsedDef.data.title;
    this.content = marked(parsedDef.content);
    this.createdAt = parsedDef.data.createdAt;
    this.layout = parsedDef.data.layout ?? 'post';
  }
}

export default Page;
