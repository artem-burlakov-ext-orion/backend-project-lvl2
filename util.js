import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, filename);

const getWrittenJson = async (filename) => {
  try {
    const path = getFilePath(filename);
    const json = await fs.promises.readFile(path, 'utf8');
    const result = JSON.parse(json);
    return result;
  } catch (e) {
    console.error(e);
  }
}

const getVersion = async () => {
  try {
    const writtenPackage = await getWrittenJson('package.json');
    const { version } = writtenPackage;
    return version;
  } catch (e) {
    console.error(e)
  }
}

export {
  getWrittenJson,
  getVersion,
  getFilePath,
};
