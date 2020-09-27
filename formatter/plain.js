const getResultByType = (value) => {
  switch (typeof value) {
    case 'string':
      return `${value}`;
    case 'object':
      return '[complex value]';
    default: 
      return value;
  }
};

const renders = {
  added: ({ key, newValue }) => `Property '${key}' was added with value: ${getResultByType(newValue)}`,
  deleted: ({ key }) => `Property '${key}' was removed`,
  nested: ({ key }) => `${key} is nested`,
}

const getLineFeed = (data) => data === '' ? data : '\n';



export default (data) => data.reduce((acc, elem) => `${acc}${getLineFeed(acc)}${renders[elem.state](elem)}`, '');
