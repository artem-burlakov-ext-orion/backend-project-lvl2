import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, filename);

const getVersion = async () => {
  try {
    const json = await fs.promises.readFile(getFilePath('package.json'), 'utf8');
    const version = JSON.parse(json);
    return version;
  } catch (e) {
    console.error(e)
  }
}

export default getVersion;
