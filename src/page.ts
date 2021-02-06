import marked from 'marked';

class Page {
  title: string;
  content: string;
  createdAt: string;

  constructor(pageDefinition: string) {
    this.title = pageDefinition;
    this.content = marked(pageDefinition);
    this.createdAt = pageDefinition;
  }
}

export default Page;
