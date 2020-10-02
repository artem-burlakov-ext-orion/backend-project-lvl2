import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isBoolean = (value) => (typeof value === 'boolean' ? value : Number(value));
const getConverted = (value) => (Number.isNaN(value) ? value : isBoolean(value));

const fixIniParse = (tree) => {
  const iter = (data) => Object.entries(data).reduce((acc, [key, val]) => {
    if (_.isObject(val)) {
      return { ...acc, [key]: iter(val) };
    }
    return { ...acc, [key]: getConverted(val) };
  }, {});
  return iter(ini.parse(tree));
};

export default () => ({
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: fixIniParse,
});
