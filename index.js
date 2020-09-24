import _ from 'lodash';
import { readFile } from './util.js';

const isExist = (after, before, key) => _.has(after, key) && _.has(before, key);

const isUnchanged = (before, after, key) => before[key] === after[key];
const isDeleted = (before, after, key) => _.has(before, key) && !_.has(after, key);
const isAdded = (before, after, key) => _.has(after, key) && !_.has(before, key);
const isChanged = (before, after, key) => isExist(before, after, key) && before[key] !== after[key];
const isObject = (before, after, key) => _.isObject(before[key]) && _.isObject(after[key]);

const getStates = (before, after, key, f) => [
  {
    state: 'added',
    check: () => isAdded(before, after, key),
    result: (depth) => `${' '.repeat(depth)}+ ${key}: ${after[key]}`,
  },
  {
    state: 'deleted',
    check: () => isDeleted(before, after, key),
    result: (depth) => `${' '.repeat(depth)}- ${key}: ${before[key]}`,
  },
  {
    state: 'unchanged',
    check: () => isUnchanged(before, after, key),
    result: (depth) => `${' '.repeat(depth)}  ${key}: ${before[key]}`,
  },
  {
    state: 'changed',
    check: () => isChanged(before, after, key),
    result: (depth) => `${' '.repeat(depth)}- ${key}: ${before[key]}\n${' '.repeat(depth)}+ ${key}: ${after[key]}`,
  },
  {
    state: 'nested',
    check: () => isObject(before, after, key),
    result: (depth) => f(before[key], after[key], depth + 2),
  }
];

export default (firstFilePath, secondFilePath) => {
  const before = readFile(firstFilePath);
  const after = readFile(secondFilePath);

  const f = (before, after, depth) => {
    const uniqKeys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
    const allData = uniqKeys.reduce((acc, key) => {
      const { result } = getStates(before, after, key, f).find(({ check }) => check());
      acc.push(result(depth));
      return acc;
    }, []);
    return `{\n${allData.join('\n')}\n}`;
  }
  return f(before, after, 2);
};

//  export default (firstFilePath, secondFilePath) => {
//   const before = readFile(firstFilePath);
//   const after = readFile(secondFilePath);

//   const f = (before, after, depth) => {
//     const uniqKeys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
//     const allData = uniqKeys.reduce((acc, key) => {
//       const [, { result }] = Object.entries(getStates(before, after, key, f))
//         .find(([, stateVal]) => stateVal.check());
//       acc.push(result(depth));
//       return acc;
//     }, []);
//     return `{\n${allData.join('\n')}\n}`;
//   }
//   return f(before, after, 2);
// };
