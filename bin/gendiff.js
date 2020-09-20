#! /usr/bin/env node

import program from 'commander';
import getVersion from '../util.js';

program
 .version(getVersion())
 .description('')
 .parse(process.argv)
 