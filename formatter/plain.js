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
  added: ({ key, newValue }) => `Property '${key}' was added with value: ${getResultByType(newValue)}`,
  deleted: ({ key }) => `Property '${key}' was removed`,
  nested: ({ children }, f) => f(children),
  unchanged: () => null,
  changed: ({ key, oldValue, newValue}) => {
    return `Property '${key}' was updated. From ${getResultByType(oldValue)} to ${getResultByType(newValue)}`;
  },
}

const getLineFeed = (data) => data === '' ? data : '\n';

export default (data) => {
  const f = (data) => {
    const result = data.reduce((acc, elem) => {
      const render = renders[elem.state](elem, f);
      return render === null ? acc : `${acc}${getLineFeed(acc)}${render}`;
    }, '');
    return result;
  }
  return f(data);
};
