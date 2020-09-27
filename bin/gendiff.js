#! /usr/bin/env node

import program from 'commander';
import util from 'util';
import { getVersion, getPath } from '../util.js';
import buildDiff from '../index.js';



// console.log(util.inspect(myObject, {showHidden: false, depth: null}))

// // alternative shortcut
// console.log(util.inspect(myObject, false, null, true /* enable colors */))

program
  .version(getVersion())
  .description('two files difference')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => {
    const obj = buildDiff(getPath(firstFile), getPath(secondFile), program.format);
    console.table(obj);
    console.log(util.inspect(obj, {showHidden: false, depth: null}));
  })
  .parse(process.argv);
