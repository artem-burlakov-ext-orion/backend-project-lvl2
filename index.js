import _ from 'lodash';
import { readFile } from './util.js';

const isExist = (after, before, key) => _.has(after, key) && _.has(before, key);

const isUnchanged = (before, after, key) => before[key] === after[key];
const isDeleted = (before, after, key) => !_.has(after, key);
const isAdded = (before, after, key) => !_.has(before, key);
const isChanged = (before, after, key) => isExist(before, after, key) && before[key] !== after[key];
const isObject = (before, after, key) => _.isObject(before[key]) && _.isObject(after[key]);

// result: (depth) => `${' '.repeat(depth)}+ ${key}: ${after[key]}`,
// result: (depth) => `${' '.repeat(depth)}- ${key}: ${before[key]}`,
// result: (depth) => `${' '.repeat(depth)}  ${key}: ${before[key]}`,
// result: (depth) => `${' '.repeat(depth)}- ${key}: ${before[key]}\n${' '.repeat(depth)}+ ${key}: ${after[key]}`,
//result: (depth) => f(before[key], after[key], depth + 2),


const getState = (before, after, key, f) => [
  {
    state: 'added',
    check: () => isAdded(before, after, key),
    getTreeElem: () => ({ newValue: after[key]}),
  },
  {
    state: 'deleted',
    check: () => isDeleted(before, after, key),
    getTreeElem: () => ({ oldValue: before[key]}),
  },
  {
    state: 'unchanged',
    check: () => isUnchanged(before, after, key),
    getTreeElem: () => ({ oldValue: before[key]}),
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

// const stylish = (data) => `{\n${allData.join('\n')}\n}`;

const getDefaultFormat = (data) => {
  data.reduce((acc, elem) => {

  })

}

const getFormatted = (data) => ({
  stylish: () => getDefaultFormat(data),
});

const buildTree = (before, after) => {
  const uniqKeys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
  return uniqKeys.map((key) => {
    const { state, getTreeElem } = getState(before, after, key, buildTree)
      .find(({ check }) => check());
    const value = getTreeElem();
    console.log(value);
    return { 
      key,
      state,
      ...value,
    };
  });
};

export default (firstFilePath, secondFilePath) => {
  const before = readFile(firstFilePath);
  const after = readFile(secondFilePath);
  const tree = buildTree(before, after);
  console.log(tree);
  return tree;
};
  
