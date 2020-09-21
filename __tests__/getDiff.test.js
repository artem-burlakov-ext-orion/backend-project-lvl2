import getDiff from '../index.js';

describe('json files diff result', () => {
  it('should return string', () => {
    const result = getDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
    expect(typeof result).toBe('string');
  });
});
