import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const hasOnlyDigits = (value) => /^-?\d+$/.test(value);
const getConverted = (value) => (hasOnlyDigits(value) ? Number(value) : value);

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
