const getResultByType = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const renders = {
  added: ({ newValue }, curKeysChain) => `Property '${curKeysChain}' was added with value: ${getResultByType(newValue)}`,
  deleted: (curKeysChain) => `Property '${curKeysChain}' was removed`,
  nested: ({ children }, curKeysChain, f) => f(children, curKeysChain),
  unchanged: () => '',
  changed: ({ oldValue, newValue }, curKeysChain) => `Property '${curKeysChain}' was updated. From ${getResultByType(oldValue)} to ${getResultByType(newValue)}`,
};

const getLineFeed = (data) => (data ? '\n' : data);
const getCurKeysChain = (keysChain, elem) => (keysChain ? `${keysChain}.${elem.key}` : elem.key);

export default (tree) => {
  const iter = (data, keysChain = '') => data.reduce((acc, elem) => {
    const result = renders[elem.state](elem, getCurKeysChain(keysChain, elem), iter);
    return result ? `${acc}${getLineFeed(acc)}${result}` : acc;
  }, '');
  return iter(tree);
};
