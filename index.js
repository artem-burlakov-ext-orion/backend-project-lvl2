import { has, keys, union, isObject } from 'lodash';
import { readFile } from './src/util.js';
import getFormatted from './src/formatter/index.js';

const isExist = (after, before, key) => has(after, key) && has(before, key);

const isUnchanged = (before, after, key) => before[key] === after[key];
const isDeleted = (after, key) => !has(after, key);
const isAdded = (before, key) => !has(before, key);
const isChanged = (before, after, key) => isExist(before, after, key) && before[key] !== after[key];
const isObject = (before, after, key) => isObject(before[key]) && isObject(after[key]);

const getState = (before, after, key, f) => [
  {
    state: 'added',
    check: () => isAdded(before, key),
    build: () => ({ newValue: after[key] }),
  },
  {
    state: 'deleted',
    check: () => isDeleted(after, key),
    build: () => ({ oldValue: before[key] }),
  },
  {
    state: 'unchanged',
    check: () => isUnchanged(before, after, key),
    build: () => ({ oldValue: before[key] }),
  },
  {
    state: 'nested',
    check: () => isObject(before, after, key),
    build: () => ({ children: f(before[key], after[key]) }),
  },
  {
    state: 'changed',
    check: () => isChanged(before, after, key),
    build: () => ({
      oldValue: before[key],
      newValue: after[key],
    }),
  },
];

const buildTree = (before, after) => {
  const uniqKeys = union(keys(before), keys(after));
  const sortedUniqKeys = uniqKeys.sort();
  return sortedUniqKeys.map((key) => {
    const { state, build } = getState(before, after, key, buildTree)
      .find(({ check }) => check());
    return { key, state, ...build() };
  });
};

export default (firstFile, secondFile, format) => {
  const tree = buildTree(readFile(firstFile), readFile(secondFile));
  return getFormatted(format)(tree);
};
