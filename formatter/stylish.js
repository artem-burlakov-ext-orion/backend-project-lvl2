const renders = {
  added: ({ key, newValue }, depth) => `${' '.repeat(depth)}+ ${key}: ${newValue}`,
  deleted: ({ key, oldValue }, depth) => `${' '.repeat(depth)}- ${key}: ${oldValue}`,
  changed: ({ key, oldValue, newValue }, depth) => `${' '.repeat(depth)}- ${key}: ${oldValue}\n${' '.repeat(depth)}+ ${key}: ${newValue}`,
  unchanged: ({ key, oldValue }, depth) => `${' '.repeat(depth)}  ${key}: ${oldValue}`,
  nested: ({ key, children }, depth, f) => `${' '.repeat(depth)}  ${key}: ${f(children, depth + 4)}`,
};

export default (tree) => {
  const iter = (data, depth = 2) => `{${data.reduce((acc, elem) => `${acc}\n${renders[elem.state](elem, depth, iter)}`, '')}\n}`;
  return iter(tree);
};
