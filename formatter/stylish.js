const renders = {
  added: ({ key, newValue }, depth) => `${' '.repeat(depth)}+ ${key}: ${newValue}`,
  deleted: ({ key, oldValue }, depth) => `${' '.repeat(depth)}- ${key}: ${oldValue}`,
  changed: ({ key, oldValue, newValue}, depth) => {
    return `${' '.repeat(depth)}- ${key}: ${oldValue}\n${' '.repeat(depth)}+ ${key}: ${newValue}`;
  },
  unchanged: ({ key, oldValue }, depth) => `${' '.repeat(depth)}  ${key}: ${oldValue}`,
  nested: ({ key, children }, depth, f) => {
      return `${' '.repeat(depth)}  ${key}: ${f(children, depth + 4)}`;
  },
};

export default (tree) => {
  const iter = (data, depth = 2) => {
    const resultString =  data.reduce((acc, elem) => {
      acc = `${acc}\n${renders[elem.state](elem, depth, iter)}`;
      return acc;
    }, '');
    return `{${resultString}\n}`;
  }
  return iter(tree);
};