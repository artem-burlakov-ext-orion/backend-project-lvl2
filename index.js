import { getWrittenJson } from './util.js';

export default async (before, after, outputType) => {
  const beforeData = await getWrittenJson(before);
  const afterData = await getWrittenJson(after);
  const beforeKeys = Object.keys(beforeData);
  const afterKeys = Object.keys(afterData);
  const uniqKeys = [...new Set([...beforeKeys, ...afterKeys])];
 
  const added = afterKeys
    .filter((key) => !beforeKeys.includes(key))
    .map((key) => `  + ${key}: ${afterData[key]}`);

  const deleted = beforeKeys
    .filter((key) => !afterKeys.includes(key))
    .map((key) => `  - ${key}: ${beforeData[key]}`);

  const unchanged = afterKeys
    .filter((key) => afterData[key] === beforeData[key])
    .map((key) => `    ${key}: ${beforeData[key]}`);

  const changed = uniqKeys
    .filter((key) => beforeData[key] !== afterData[key] && beforeKeys.includes(key) && afterKeys.includes(key))
    .map((key) => `  - ${key}: ${beforeData[key]}\n  + ${key}: ${afterData[key]}`);

  const allData = [...added, ...deleted, ...unchanged, ...changed].join('\n');
  console.log(`{\n${allData}\n}`);
  return;
};
