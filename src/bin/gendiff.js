#! /usr/bin/env node

import program from 'commander';
import { getVersion, getPath } from '../util.js';
import buildDiff from '../../index.js';

program
  .version(getVersion())
  .description('two files difference')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => {
    const before = getPath(firstFile);
    const after = getPath(secondFile);
    const diff = buildDiff(before, after, program.format);
    console.log(diff);
  })
  .parse(process.argv);
