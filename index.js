import _ from 'lodash';
import { getWrittenJson } from './util.js';

const isUnchanged = (before, after, key) => before[key] === after[key];
const isDeleted = (before, after, key) => _.has(before, key) && !_.has(after, key);
const isAdded = (before, after, key) => _.has(after, key) && !_.has(before, key);

const getConvertedData = (before, after, key) => ({
  added: `  + ${key}: ${after[key]}`,
  deleted: `  - ${key}: ${before[key]}`,
  unchanged: `    ${key}: ${before[key]}`,
  changed: `  - ${key}: ${before[key]}\n  + ${key}: ${after[key]}`,
});

export default (beforeData, afterData, outputType) => {
  const before = getWrittenJson(beforeData);
  const after = getWrittenJson(afterData);
  const uniqKeys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
  const allData = uniqKeys.reduce((acc, key) => {
    let newItem = getConvertedData(before, after, key).changed;
    if (isUnchanged(before, after, key)) {
      newItem = getConvertedData(before, after, key).unchanged;
    }
    if (isAdded(before, after, key)) {
      newItem = getConvertedData(before, after, key).added;
    }
    if (isDeleted(before, after, key)) {
      newItem = getConvertedData(before, after, key).deleted;
    }
    acc.push(newItem);
    return acc;
  }, []);
  console.log(`{\n${allData.join('\n')}\n}`);
};

//   const added = afterKeys
//     .filter((key) => !beforeKeys.includes(key))
//     .map((key) => `  + ${key}: ${afterData[key]}`);

//   const deleted = beforeKeys
//     .filter((key) => !afterKeys.includes(key))
//     .map((key) => `  - ${key}: ${beforeData[key]}`);

//   const unchanged = afterKeys
//     .filter((key) => afterData[key] === beforeData[key])
//     .map((key) => `    ${key}: ${beforeData[key]}`);

//   const changed = uniqKeys
//     .filter((key) => beforeData[key] !== afterData[key] && beforeKeys.includes(key) && afterKeys.includes(key))
//     .map((key) => `  - ${key}: ${beforeData[key]}\n  + ${key}: ${afterData[key]}`);

//   const allData = [...added, ...deleted, ...unchanged, ...changed].join('\n');
//   console.log(`{\n${allData}\n}`);
//   return;
// };
