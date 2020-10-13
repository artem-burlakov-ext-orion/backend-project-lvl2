import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import buildDiff from '../index.js';
import _ from 'lodash';

const getPath = (fileName) => join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', fileName);

const validInputFileExts = ['ini', 'yml', 'json'];
const inValidInputFileExts = ['txt', 'doc', 'odt', 'js'];
const validOutputFormats = ['stylish', 'plain', 'json'];
const inValidOutputFormats = ['txt', 'xml'];
const validOutputFormatsExts = {
  stylish: 'txt',
  json: 'json',
  plain: 'txt',
};

const validTestData = validOutputFormats.reduce((acc, format) => {
  let testDataCurrentValue = [...acc];
  validInputFileExts.forEach((beforeExt) => {
    validInputFileExts.forEach((afterExt) => {
      const beforePath = getPath(`before-nested.${beforeExt}`);
      const afterPath = getPath(`after-nested.${afterExt}`);
      testDataCurrentValue = [...testDataCurrentValue, [beforePath, afterPath, format]];
    });
  });
  return testDataCurrentValue;
}, []);

const inValidBeforeTestData = validOutputFormats.reduce((acc, format) => {
  let testDataCurrentValue = [...acc];
  inValidInputFileExts.forEach((beforeExt) => {
    validInputFileExts.forEach((afterExt) => {
      const beforePath = getPath(`before-nested.${beforeExt}`);
      const afterPath = getPath(`after-nested.${afterExt}`);
      testDataCurrentValue = [...testDataCurrentValue, [beforePath, afterPath, format, beforeExt]];
    });
  });
  return testDataCurrentValue;
}, []);

const inValidAfterTestData = validOutputFormats.reduce((acc, format) => {
  let testDataCurrentValue = [...acc];
  validInputFileExts.forEach((beforeExt) => {
    inValidInputFileExts.forEach((afterExt) => {
      const beforePath = getPath(`before-nested.${beforeExt}`);
      const afterPath = getPath(`after-nested.${afterExt}`);
      testDataCurrentValue = [...testDataCurrentValue, [beforePath, afterPath, format, afterExt]];
    });
  });
  return testDataCurrentValue;
}, []);

const inValidOutputTestData = inValidOutputFormats.reduce((acc, format) => {
  let testDataCurrentValue = [...acc];
  validInputFileExts.forEach((beforeExt) => {
    validInputFileExts.forEach((afterExt) => {
      const beforePath = getPath(`before-nested.${beforeExt}`);
      const afterPath = getPath(`after-nested.${afterExt}`);
      testDataCurrentValue = [...testDataCurrentValue, [beforePath, afterPath, format]];
    });
  });
  return testDataCurrentValue;
}, []);

const expectedData = validOutputFormats.reduce((acc, format) => {
  const resultPath = getPath(`result-${format}.${validOutputFormatsExts[format]}`);
  return { ...acc, [format]: fs.readFileSync(resultPath, 'utf8') };
}, {});

describe('check test data', () => {
  test('invalidExts and validExts include different extensions', () => {
    const result = validInputFileExts.filter((ext) => inValidInputFileExts.includes(ext));
    expect(result).toHaveLength(0);
  });
  test('invalidOutputFormats and validOutputFormats include different formats', () => {
    const result = validOutputFormats.filter((ext) => inValidOutputFormats.includes(ext));
    expect(result).toHaveLength(0);
  });
});

describe('valid input files and valid output format', () => {
  test.each(validTestData)('before: %s\nafter: %s\noutput: %s', (before, after, format) => {
    expect(buildDiff(before, after, format)).toBe(expectedData[format]);
  });
});

describe('invalid input files and valid output format', () => {
  test.each(inValidBeforeTestData)('before: %s\nafter: %s\noutput: %s', (before, after, format, beforeExt) => {
    expect(() => buildDiff(before, after, format)).toThrow(`Unknown extension '${beforeExt}'.`);
  });
  test.each(inValidAfterTestData)('before: %s\nafter: %s\noutput: %s', (before, after, format, afterExt) => {
    expect(() => buildDiff(before, after, format)).toThrow(`Unknown extension '${afterExt}'.`);
  });
});

describe('valid input files and invalid output format', () => {
  test.each(inValidOutputTestData)('before: %s\nafter: %s\noutput: %s', (before, after, format) => {
    expect(() => buildDiff(before, after, format)).toThrow(`Unknown output format '${format}'.`);
  });
});
