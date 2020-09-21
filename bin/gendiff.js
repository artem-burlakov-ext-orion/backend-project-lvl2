#! /usr/bin/env node

import program from 'commander';
import { getVersion, getFilePath } from '../util.js';
import getDiff from '../index.js';

program
  .version(getVersion())
  .description('two files difference')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => {
    console.log(getDiff(getFilePath(firstFile), getFilePath(secondFile), program.format));
  })
  .parse(process.argv);
