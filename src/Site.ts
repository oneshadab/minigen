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
}

export default Site;