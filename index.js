import _ from 'lodash';
import { getWrittenJson } from './util.js';

const isExist = (after, before, key) => _.has(after, key) && _.has(before, key);

const isUnchanged = (before, after, key) => before[key] === after[key];
const isDeleted = (before, after, key) => _.has(before, key) && !_.has(after, key);
const isAdded = (before, after, key) => _.has(after, key) && !_.has(before, key);
const isChanged = (before, after, key) => isExist(before, after, key) && before[key] !== after[key];

const getStates = (before, after, key) => ({
  added: {
    check: () => isAdded(before, after, key),
    result: `  + ${key}: ${after[key]}`,
  },
  deleted: {
    check: () => isDeleted(before, after, key),
    result: `  - ${key}: ${before[key]}`,
  },
  unchanged: {
    check: () => isUnchanged(before, after, key),
    result: `    ${key}: ${before[key]}`,
  },
  changed: {
    check: () => isChanged(before, after, key),
    result: `  - ${key}: ${before[key]}\n  + ${key}: ${after[key]}`,
  },
});

export default (firstFilePath, secondFilePath, outputType) => {
  const before = getWrittenJson(firstFilePath);
  const after = getWrittenJson(secondFilePath);

  const uniqKeys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
  const allData = uniqKeys.reduce((acc, key) => {
    const [, { result }] = Object.entries(getStates(before, after, key))
      .find(([, stateVal]) => stateVal.check());
    acc.push(result);
    return acc;
  }, []);
  return `{\n${allData.join('\n')}\n}`;
};
