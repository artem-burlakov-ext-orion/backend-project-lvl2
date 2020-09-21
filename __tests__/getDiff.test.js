import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('json files diff result', () => {
  const beforePath = join(__dirname, '..', '__fixtures__', 'file1.json');
  const afterPath = join(__dirname, '..', '__fixtures__', 'file2.json');
  const jsonResultPath = join(__dirname, '..', '__fixtures__', 'jsonFilesDiff');

  it('should return string', () => {
    const result = getDiff(beforePath, afterPath);
    expect(typeof result).toBe('string');
  });

  it('should return result as in jsonFilesDiff', () => {
    const result = getDiff(beforePath, afterPath);
    const expected = fs.readFileSync(jsonResultPath, 'utf8');
    expect(result).toBe(expected);
  });
});
