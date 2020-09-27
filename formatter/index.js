import stylishFormat from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

export default (tree) => ({
  stylish: () => stylishFormat(tree),
  plain: () => plainFormatter(tree),
  json: () => jsonFormatter(tree),
});
