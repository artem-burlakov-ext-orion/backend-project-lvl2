const path = require('path');
const fs = require('fs').promises;

const getFilePath = (filename) => path.join(__dirname, filename);

const getVersion = async () => {
  try {
    const json = await fs.readFile(getFilePath('package.json'), 'utf8');
    const version = JSON.parse(json);
    return version;
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  getVersion,
}
