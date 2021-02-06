import fs from 'fs';
import util from 'util';

async function readFileContent(path: string): Promise<string> {
  const content = await util.promisify(fs.readFile)(path);
  return content.toString();
}

async function writeFileContent(path: string, content: string): Promise<void> {
  await util.promisify(fs.writeFile)(path, content);
}

export default {
  readFileContent,
  writeFileContent,
};
