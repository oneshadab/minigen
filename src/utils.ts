import fs from 'fs-extra';
import path from 'path';

async function readFileContent(filepath: string): Promise<string> {
  return fs.readFile(filepath, 'utf8');
}

async function writeFileContent(filepath: string, content: string): Promise<void> {
  await fs.writeFile(filepath, content);
}

async function listAllFiles(dirPath: string): Promise<string[]> {
  const filenames = await fs.readdir(dirPath);
  return filenames.map((filename) => path.join(dirPath, filename));
}

async function copyDir(srcDir: string, dstDir: string): Promise<void> {
  return fs.copy(srcDir, dstDir, { recursive: true });
}

function extractFilename(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

export default {
  readFileContent,
  writeFileContent,
  listAllFiles,
  extractFilename,
  copyDir,
};
