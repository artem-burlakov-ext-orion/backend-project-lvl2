import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import buildDiff from '../index.js';

const getPath = (fileName) => join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', fileName);

const outputData = {
  json: {
    ext: 'json',
    parse: (path) => (fs.readFileSync(path, 'utf8')),
  },
  plain: {
    ext: 'txt',
    parse: (path) => fs.readFileSync(path, 'utf8'),
  },
  stylish: {
    ext: 'txt',
    parse: (path) => fs.readFileSync(path, 'utf8'),
  },
};

const validExts = ['ini', 'yml', 'json'];
const validOutputFormats = ['stylish', 'plain', 'json'];

const testData = validExts.reduce((acc, ext) => {
  validOutputFormats.forEach((format) => {
    const beforePath = getPath(`before-nested.${ext}`);
    const afterPath = getPath(`after-nested.${ext}`);
    acc = [...acc, [ext, format, beforePath, afterPath]];
  });
  return acc;
}, []);

const expectedData = validOutputFormats.reduce((acc, format) => {
  const resultPath = getPath(`result-${format}.${outputData[format].ext}`);
  return {...acc, [format]: outputData[format].parse(resultPath)};
}, {});




// validExts.reduce((acc, ext) => {
//   acc.push([])

// },[])

// ['ini','ini','stylish']

test.each(testData)('build %s files diff, output %s', (_, format, before, after) => {
  expect(buildDiff(before, after, format)).toBe(expectedData[format]);
});
