#! /usr/bin/env node

import program from 'commander';
import { getVersion, getPath } from '../util.js';
import buildDiff from '../index.js';
import formatter from '../formatter.js';


program
  .version(getVersion())
  .description('two files difference')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => {
    console.log(buildDiff(getPath(firstFile), getPath(secondFile), program.format));
  })
  .parse(process.argv);
