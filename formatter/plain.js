const getValByType = (value) => {
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
  added: (curKeysChain, { newValue }) => `Property '${curKeysChain}' was added with value: ${getValByType(newValue)}`,
  deleted: (curKeysChain) => `Property '${curKeysChain}' was removed`,
  nested: (curKeysChain, { children }, f) => f(children, curKeysChain),
  unchanged: () => '',
  changed: (curKeysChain, { oldValue, newValue }) => `Property '${curKeysChain}' was updated. From ${getValByType(oldValue)} to ${getValByType(newValue)}`,
};

const getLineFeed = (data) => (data ? '\n' : data);
const getCurKeysChain = (keysChain, elem) => (keysChain ? `${keysChain}.${elem.key}` : elem.key);

export default (tree) => {
  const iter = (data, keysChain) => data.reduce((acc, elem) => {
    const result = renders[elem.state](getCurKeysChain(keysChain, elem), elem, iter);
    const newAcc = `${acc}${getLineFeed(acc)}${result}`;
    return result ? newAcc : acc;
  }, '');
  return iter(tree, '');
};
