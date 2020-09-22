import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getDiff from '../index.js';

describe('json files diff result', () => {
  const beforePath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'before.json');
  const afterPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'after.json');
  const jsonResultPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'genDiffResult');

  it('should return string', () => {
    const result = getDiff(beforePath, afterPath);
    expect(typeof result).toBe('string');
  });

  it('should return result as in genDiffResult', () => {
    const result = getDiff(beforePath, afterPath);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});

describe('yml files diff result', () => {
  const beforePath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'before.yml');
  const afterPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'after.yml');
  const jsonResultPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'genDiffResult');

  it('should return string', () => {
    const result = getDiff(beforePath, afterPath);
    expect(typeof result).toBe('string');
  });

  it('should return result as in genDiffResult', () => {
    const result = getDiff(beforePath, afterPath);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});

describe('ini files diff result', () => {
  const beforePath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'before.ini');
  const afterPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'after.ini');
  const jsonResultPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'genDiffResult');

  it('should return string', () => {
    const result = getDiff(beforePath, afterPath);
    expect(typeof result).toBe('string');
  });

  it('should return result as in genDiffResult', () => {
    const result = getDiff(beforePath, afterPath);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});
