import _ from 'lodash';
import { readFile } from './util.js';
import formatter from './formatter/index.js';

const isExist = (after, before, key) => _.has(after, key) && _.has(before, key);

const isUnchanged = (before, after, key) => before[key] === after[key];
const isDeleted = (before, after, key) => !_.has(after, key);
const isAdded = (before, after, key) => !_.has(before, key);
const isChanged = (before, after, key) => isExist(before, after, key) && before[key] !== after[key];
const isObject = (before, after, key) => _.isObject(before[key]) && _.isObject(after[key]);

const getState = (before, after, key, f) => [
  {
    state: 'added',
    check: () => isAdded(before, after, key),
    getTreeElem: () => ({ newValue: after[key] }),
  },
  {
    state: 'deleted',
    check: () => isDeleted(before, after, key),
    getTreeElem: () => ({ oldValue: before[key] }),
  },
  {
    state: 'unchanged',
    check: () => isUnchanged(before, after, key),
    getTreeElem: () => ({ oldValue: before[key] }),
  },
  {
    state: 'nested',
    check: () => isObject(before, after, key),
    getTreeElem: () => ({ children: f(before[key], after[key]) }),
  },
  {
    state: 'changed',
    check: () => isChanged(before, after, key),
    getTreeElem: () => ({
      oldValue: before[key],
      newValue: after[key],
    }),
  },
];

const buildTree = (before, after) => {
  const sortedUniqKeys = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
  return sortedUniqKeys.map((key) => {
    const { state, getTreeElem } = getState(before, after, key, buildTree)
      .find(({ check }) => check());
    const value = getTreeElem();
    return {
      key,
      state,
      ...value,
    };
  });
};

export default (firstFile, secondFile, format) => {
  const tree = buildTree(readFile(firstFile), readFile(secondFile));
  return formatter(tree)[format]();
};
