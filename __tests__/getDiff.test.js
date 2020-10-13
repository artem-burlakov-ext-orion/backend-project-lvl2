import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import buildDiff from '../index.js';

const getPath = (fileName) => join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', fileName);

const validExts = ['ini', 'yml', 'json'];
const inValidExts = ['txt', 'doc', 'odt', 'js'];
const defaultOutputFormat = 'stylish';
const validOutputFormats = [defaultOutputFormat, 'plain', 'json'];
const inValidOutputFormats = ['txt', 'xml'];

const outputData = {
  json: {
    ext: 'json',
    parse: (path) => fs.readFileSync(path, 'utf8'),
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

const validTestData = validOutputFormats.reduce((acc, format) => {
  let testDataCurrentValue = [...acc];
  validExts.forEach((ext1) => {
    validExts.forEach((ext2) => {
      const beforePath = getPath(`before-nested.${ext1}`);
      const afterPath = getPath(`after-nested.${ext2}`);
      testDataCurrentValue = [...testDataCurrentValue, [beforePath, afterPath, format]];
    });
  });
  return testDataCurrentValue;
}, []);

const inValidTestData1 = validOutputFormats.reduce((acc, format) => {
  let testDataCurrentValue = [...acc];
  inValidExts.forEach((ext1) => {
    validExts.forEach((ext2) => {
      const beforePath = getPath(`before-nested.${ext1}`);
      const afterPath = getPath(`after-nested.${ext2}`);
      testDataCurrentValue = [...testDataCurrentValue, [beforePath, afterPath, format, ext1]];
    });
  });
  return testDataCurrentValue;
}, []);

const inValidTestData2 = validOutputFormats.reduce((acc, format) => {
  let testDataCurrentValue = [...acc];
  validExts.forEach((ext1) => {
    inValidExts.forEach((ext2) => {
      const beforePath = getPath(`before-nested.${ext1}`);
      const afterPath = getPath(`after-nested.${ext2}`);
      testDataCurrentValue = [...testDataCurrentValue, [beforePath, afterPath, format, ext2]];
    });
  });
  return testDataCurrentValue;
}, []);

const defaultOutputTestData = validExts.reduce((acc, ext1) => {
  let testDataCurrentValue = [...acc];
  validExts.forEach((ext2) => {
    const beforePath = getPath(`before-nested.${ext1}`);
    const afterPath = getPath(`after-nested.${ext2}`);
    testDataCurrentValue = [...testDataCurrentValue, [beforePath, afterPath, defaultOutputFormat]];
  });
  return testDataCurrentValue;
}, []);

const inValidOutputTestData = inValidOutputFormats.reduce((acc, format) => {
  let testDataCurrentValue = [...acc];
  validExts.forEach((ext1) => {
    validExts.forEach((ext2) => {
      const beforePath = getPath(`before-nested.${ext1}`);
      const afterPath = getPath(`after-nested.${ext2}`);
      testDataCurrentValue = [...testDataCurrentValue, [beforePath, afterPath, format]];
    });
  });
  return testDataCurrentValue;
}, []);

const expectedData = validOutputFormats.reduce((acc, format) => {
  const resultPath = getPath(`result-${format}.${outputData[format].ext}`);
  return { ...acc, [format]: outputData[format].parse(resultPath) };
}, {});

describe('check test data', () => {
  test('invalidExts and validExts include different extensions', () => {
    const result = validExts.filter((ext) => inValidExts.includes(ext));
    expect(result).toHaveLength(0);
  });
  test('invalidOutputFormats and validOutputFormats include different formats', () => {
    const result = validOutputFormats.filter((ext) => inValidOutputFormats.includes(ext));
    expect(result).toHaveLength(0);
  });
  test('validOutputFormats include defaultOutputFormat', () => {
    const result = validOutputFormats.includes(defaultOutputFormat);
    expect(result).toBe(true);
  });
});

describe('valid input files and valid output format', () => {
  test.each(validTestData)('before: %s\nafter: %s\noutput: %s', (before, after, format) => {
    expect(buildDiff(before, after, format)).toBe(expectedData[format]);
  });
  test.each(defaultOutputTestData)('before: %s\nafter: %s\n default output: %s', (before, after, format) => {
    expect(buildDiff(before, after, format)).toBe(expectedData[format]);
  });
});

describe('invalid input files and valid output format', () => {
  test.each(inValidTestData1)('before: %s\nafter: %s\noutput: %s', (before, after, format, beforeExt) => {
    expect(() => buildDiff(before, after, format)).toThrow(`Unknown extension '${beforeExt}'.`);
  });
  test.each(inValidTestData2)('before: %s\nafter: %s\noutput: %s', (before, after, format, afterExt) => {
    expect(() => buildDiff(before, after, format)).toThrow(`Unknown extension '${afterExt}'.`);
  });
});

describe('valid input files and invalid output format', () => {
  test.each(inValidOutputTestData)('before: %s\nafter: %s\noutput: %s', (before, after, format) => {
    expect(() => buildDiff(before, after, format)).toThrow(`Unknown output format '${format}'.`);
  });
});
