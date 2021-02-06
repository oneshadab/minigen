import handlebars from 'handlebars';
import marked from 'marked';
import fs from 'fs';
import util from 'util';

async function readFileContent(path: string): Promise<string> {
  const content = await util.promisify(fs.readFile)(path);
  return content.toString();
}

async function main() {
  const post = await readFileContent("sample/pages/first-post.md");
  const page = { content: marked(post) };

  const template = await readFileContent("sample/layout/post.hbs");

  const compiledTemplate = handlebars.compile(template);
  const out = compiledTemplate({ page });

  console.log(out);
}

main();
