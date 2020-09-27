import { dirname, join, extname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import getParser from './parsers/parsers.js';

const getPath = (filename) => join(dirname(fileURLToPath(import.meta.url)), filename);

const readFile = (filePath) => {
  const ext = extname(filePath).slice(1);
  return getParser()[ext](readFileSync(filePath, 'utf8'));
};

const getVersion = () => readFile('package.json').version;

export {
  readFile,
  getVersion,
  getPath,
};
