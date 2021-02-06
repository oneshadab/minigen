import marked from 'marked';

class Page {
  title: string;
  content: string;
  createdAt: string;
  layout: string;

  constructor(pageDefinition: string) {
    this.title = pageDefinition;
    this.content = marked(pageDefinition);
    this.createdAt = pageDefinition;
    this.layout = 'post';
  }
}

export default Page;
