import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import buildDiff from '../index.js';

const getPath = (fileName) => join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', fileName);

const testData = [
  ['yml', 'yml', 'stylish'],
  ['yml', 'yml', 'plain'],
  ['yml', 'yml', 'json'],
  ['yml', 'ini', 'stylish'],
  ['yml', 'ini', 'plain'],
  ['yml', 'ini', 'json'],
  ['yml', 'json', 'stylish'],
  ['yml', 'json', 'plain'],
  ['yml', 'json', 'json'],
  ['ini', 'ini', 'stylish'],
  ['ini', 'ini', 'plain'],
  ['ini', 'ini', 'json'],
  ['ini', 'json', 'stylish'],
  ['ini', 'json', 'plain'],
  ['ini', 'json', 'json'],
  ['json', 'json', 'stylish'],
  ['json', 'json', 'plain'],
  ['json', 'json', 'json'],
];

test.each(testData)('before: %s\nafter: %s\noutput: %s', (beforeExt, afterExt, format) => {
  const expected = fs.readFileSync(getPath(`result.${format}`), 'utf8');
  const beforePath = getPath(`before-nested.${beforeExt}`);
  const afterPath = getPath(`after-nested.${afterExt}`);
  expect(buildDiff(beforePath, afterPath, format)).toBe(expected);
});
