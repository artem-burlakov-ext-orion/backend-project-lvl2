import _ from 'lodash';
import stylishFormat from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const formatters = {
  stylish: stylishFormat,
  plain: plainFormatter,
  json: jsonFormatter,
};

export default (format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`Unknown output format '${format}'.`);
  }
  return formatters[format];
};
