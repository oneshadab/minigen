import fs from 'fs';
import util from 'util';
import Layout from './layout';
import Page from './page';

async function readFileContent(path: string): Promise<string> {
  const content = await util.promisify(fs.readFile)(path);
  return content.toString();
}

async function main() {
  const pageDefinition = await readFileContent('sample/pages/first-post.md');
  const layoutDefinition = await readFileContent('sample/layout/post.hbs');

  const page = new Page(pageDefinition);
  const layout = new Layout(layoutDefinition);

  const out = layout.render(page);
  console.log(out);
}

main();
