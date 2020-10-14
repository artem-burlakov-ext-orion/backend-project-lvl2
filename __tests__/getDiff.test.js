import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import buildDiff from '../index.js';

const getPath = (fileName) => join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', fileName);

const inputExts = ['ini', 'yml', 'json'];
const outputFormats = ['stylish', 'plain', 'json'];

const testData = outputFormats.reduce((acc, format) => {
  const resultPath = getPath(`result.${format}`);
  let testDataCurrentValue = [...acc];
  inputExts.forEach((beforeExt) => {
    inputExts.forEach((afterExt) => {
      const beforePath = getPath(`before-nested.${beforeExt}`);
      const afterPath = getPath(`after-nested.${afterExt}`);
      testDataCurrentValue = [...testDataCurrentValue, [beforePath, afterPath, format, resultPath]];
    });
  });
  return testDataCurrentValue;
}, []);

test.each(testData)('before: %s\nafter: %s\noutput: %s', (before, after, format, result) => {
  const expected = fs.readFileSync(result, 'utf8');
  expect(buildDiff(before, after, format)).toBe(expected);
});
