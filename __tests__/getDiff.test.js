import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, format } from 'path';
import buildDiff from '../index.js';
import getParser from '../parsers/parsers.js';
import formatters from '../formatter/index.js';

const getPath = (fileName) => join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', fileName);

const formats = Object.keys(formatters());
const exts = Object.keys(getParser());

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

const testData = exts.reduce((acc, ext) => {
  formats.map((format) => {
    const beforePath = getPath(`before-nested.${ext}`);
    const afterPath = getPath(`after-nested.${ext}`);
    acc.push([ext, format, beforePath, afterPath]);
  });
  return acc;
}, []);

const expectedData = formats.reduce((acc, format) => {
  const resultPath = getPath(`result-${format}.${outputData[format].ext}`);
  acc[format] = outputData[format].parse(resultPath);
  return acc;
}, {});

test.each(testData)('build %s files diff, output %s', (_, format, before, after) => {
  expect(buildDiff(before, after, format)).toBe(expectedData[format]);
});
