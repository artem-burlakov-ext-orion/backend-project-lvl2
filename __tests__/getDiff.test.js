import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, format } from 'path';
import buildDiff from '../index.js';
import getParser from '../parsers/parsers.js';
import formatters from '../formatter/index.js';

const getPath = (fileName) => join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', fileName);

let testData = [];
let expectedData = {};

beforeAll(() => {
  const formats = Object.keys(formatters());
  const exts = Object.keys(getParser());
  const resultExts = {
    json: 'json',
    plain: 'txt',
    stylish: 'txt',
  };

  formats.forEach((format) => {
    expectedData[format] = fs.readFileSync(getPath(`result-${format}.${resultExts[format]}`), 'utf8');
    exts.forEach((ext) => {
      const beforePath = getPath(`before-nested.${ext}`);
      const afterPath = getPath(`after-nested.${ext}`);
      testData.push(beforePath, afterPath, format);
    });
  });

  // testData = exts.reduce((acc, ext) => {
  //   formats.forEach((format) => {
  //     const beforePath = getPath(`before-nested.${ext}`);
  //     const afterPath = getPath(`after-nested.${ext}`);
  //     acc.push([beforePath, afterPath, format]);
  //   })
  //   return acc;
  // }, []);

  // expectedData = formats.reduce((acc, format) => {
  //   acc[format] = fs.readFileSync(getPath(`result-${format}.${resultExts[format]}`), 'utf8');
  //   return acc;
  // }, {});
});

test.each(testData)('build diff(%s, %s)', (before, after, format) => {
  expect(buildDiff(before, after, format)).toBe(expectedData[format]);
});
