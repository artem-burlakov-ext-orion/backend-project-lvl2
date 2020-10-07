import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const hasOnlyDigits = (value) => /^-?\d+$/.test(value);
const getConvertedIni = (value) => (hasOnlyDigits(value) ? Number(value) : value);

const fixIniParse = (tree) => {
  const iter = (data) => Object.entries(data)
    .reduce((acc, [key, val]) => {
      if (_.isObject(val)) {
        return { ...acc, [key]: iter(val) };
      }
      return { ...acc, [key]: getConvertedIni(val) };
    }, {});
  return iter(ini.parse(tree));
};

const parsers =  {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: fixIniParse,
};

export default (ext) => {
  if (!_.has(parsers, ext)) {
    throw new Error(`Unknown extension '${ext}'.`);
  }
  return parsers[ext];
};
