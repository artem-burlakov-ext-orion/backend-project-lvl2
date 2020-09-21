import { dirname, join } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const getPath = (filename) => join(dirname(fileURLToPath(import.meta.url)), filename);

const getWrittenJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const getVersion = () => getWrittenJson('package.json').version;

export {
  getWrittenJson,
  getVersion,
  getPath,
};
