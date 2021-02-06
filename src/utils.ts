import fs from 'fs';
import util from 'util';
import glob from 'glob';
import path from 'path';

async function readFileContent(filepath: string): Promise<string> {
  const content = await util.promisify(fs.readFile)(filepath);
  return content.toString();
}

async function writeFileContent(filepath: string, content: string): Promise<void> {
  await util.promisify(fs.writeFile)(filepath, content);
}

async function listAllFiles(dirPath: string): Promise<string[]> {
  return util.promisify(glob)((`${dirPath}/*`));
}

function extractFilename(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

export default {
  readFileContent,
  writeFileContent,
  listAllFiles,
  extractFilename,
};
