const { program } = require('commander');

const { getVersion } = require('./util');

program
  .version(getVersion())
  .description('')
  .parse(process.argv)





