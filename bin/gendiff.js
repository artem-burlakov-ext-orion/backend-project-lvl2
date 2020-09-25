#! /usr/bin/env node

import program from 'commander';
import { getVersion, getPath } from '../util.js';
import buildDiff from '../index.js';

program
  .version(getVersion())
  .description('two files difference')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => buildDiff(getPath(firstFile), getPath(secondFile)))
  .parse(process.argv);
