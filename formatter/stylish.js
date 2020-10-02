import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(depth);

const convertVal = (value, d) => {
  const iter = (data, depth) => {
    const result = Object.entries(data)
      .reduce((acc, [key, val]) => `${acc}${getIndent(depth + 6)}${key}: ${convertVal(val, depth + 4)}\n`, '');
    return `{\n${result}${getIndent(depth + 2)}}`;
  };
  return _.isObject(value) ? iter(value, d) : value;
};

const renders = {
  added: ({ key, newValue }, depth) => `${getIndent(depth)}+ ${key}: ${convertVal(newValue, depth)}`,
  deleted: ({ key, oldValue }, depth) => `${getIndent(depth)}- ${key}: ${convertVal(oldValue, depth)}`,
  changed: ({ key, oldValue, newValue }, depth) => `${getIndent(depth)}- ${key}: ${convertVal(oldValue, depth)}\n${' '.repeat(depth)}+ ${key}: ${convertVal(newValue, depth)}`,
  unchanged: ({ key, oldValue }, depth) => `${getIndent(depth)}  ${key}: ${convertVal(oldValue, depth)}`,
  nested: ({ key, children }, depth, f) => `${getIndent(depth)}  ${key}: ${f(children, depth + 4)}`,
};

export default (tree) => {
  const iter = (data, depth) => {
    const result = data.reduce((acc, elem) => `${acc}\n${renders[elem.state](elem, depth, iter)}`, '');
    return `{${result}\n${getIndent(depth - 2)}}`;
  };
  return iter(tree, 2);
};
