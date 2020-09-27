import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import buildDiff from '../index.js';

describe('diff with stylish format', () => {
  const beforePath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'before-nested.json');
  const afterPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'after-nested.json');
  const jsonResultPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'result-stylish');
  const format = 'stylish';

  it('should return string', () => {
    const result = buildDiff(beforePath, afterPath, format);
    expect(typeof result).toBe('string');
  });

  it('should return result as in result-stylish', () => {
    const result = buildDiff(beforePath, afterPath, format);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});

describe('diff with plain format', () => {
  const beforePath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'before-nested.json');
  const afterPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'after-nested.json');
  const jsonResultPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'result-plain');
  const format = 'plain';

  it('should return string', () => {
    const result = buildDiff(beforePath, afterPath, format);
    expect(typeof result).toBe('string');
  });

  it('should return result as in result-plain', () => {
    const result = buildDiff(beforePath, afterPath, format);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});
