import stylishFormat from './stylish.js';
import plainFormatter from './plain.js';

export default (tree) => ({
  stylish: () => stylishFormat(tree),
  plain: () => plainFormatter(tree),
});
