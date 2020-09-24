import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import buildDiff from '../index.js';

escribe('nested json files diff result', () => {
  const beforePath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'before-nested.json');
  const afterPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'after-nested.json');
  const jsonResultPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'result-nested');

  it('should return string', () => {
    const result = buildDiff(beforePath, afterPath);
    expect(typeof result).toBe('string');
  });

  it('should return result as in result-nested', () => {
    const result = buildDiff(beforePath, afterPath);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});

describe('json files diff result', () => {
  const beforePath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'before.json');
  const afterPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'after.json');
  const jsonResultPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'result');

  it('should return string', () => {
    const result = buildDiff(beforePath, afterPath);
    expect(typeof result).toBe('string');
  });

  it('should return result as in result', () => {
    const result = buildDiff(beforePath, afterPath);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});

describe('yml files diff result', () => {
  const beforePath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'before.yml');
  const afterPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'after.yml');
  const jsonResultPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'result');

  it('should return string', () => {
    const result = buildDiff(beforePath, afterPath);
    expect(typeof result).toBe('string');
  });

  it('should return result as in result', () => {
    const result = buildDiff(beforePath, afterPath);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});

describe('ini files diff result', () => {
  const beforePath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'before.ini');
  const afterPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'after.ini');
  const jsonResultPath = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'result');

  it('should return string', () => {
    const result = buildDiff(beforePath, afterPath);
    expect(typeof result).toBe('string');
  });

  it('should return result as in result', () => {
    const result = buildDiff(beforePath, afterPath);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});
