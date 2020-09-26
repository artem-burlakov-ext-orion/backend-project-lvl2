import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import buildDiff from '../index.js';

describe('nested json files diff result', () => {
  const beforePath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'before-nested.json');
  const afterPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'after-nested.json');
  const jsonResultPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'result-nested');
  const format = 'stylish';

  it('should return string', () => {
    const result = buildDiff(beforePath, afterPath, format);
    expect(typeof result).toBe('string');
  });

  it('should return result as in result-nested', () => {
    const result = buildDiff(beforePath, afterPath, format);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});

