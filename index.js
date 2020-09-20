import { getWrittenJson } from './util.js';

const isUnchanged = (before, after, key) => before[key] === after[key];
const isDeleted = (before, after, key) => {
  return Object.keys(before).includes(key) && !Object.keys(after).includes(key);
};
const isAdded = (before, after, key) => {
  return Object.keys(after).includes(key) && !Object.keys(before).includes(key);
};

export default (before, after, outputType) => {
  const beforeData = getWrittenJson(before);
  const afterData = getWrittenJson(after);
  const beforeKeys = Object.keys(beforeData);
  const afterKeys = Object.keys(afterData);
  const uniqKeys = [...new Set([...beforeKeys, ...afterKeys])];

  const allData = uniqKeys.reduce((acc, key) => {
    let newItem = `  - ${key}: ${beforeData[key]}\n  + ${key}: ${afterData[key]}`;
    if (isUnchanged(beforeData, afterData, key)) {
      newItem = `    ${key}: ${beforeData[key]}`;
    }
    if (isAdded(beforeData, afterData, key)) {
      newItem = `  + ${key}: ${afterData[key]}`;
    }
    if (isDeleted(beforeData, afterData, key)) {
      newItem = `  - ${key}: ${beforeData[key]}`;
    }
    acc = `${acc}\n${newItem}`;
    return acc;
  }, '');
  console.log(`{\n${allData}\n}`);
  return;
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
