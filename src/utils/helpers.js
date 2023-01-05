export const formatingNumber = ({ value, type = 'IDR', fraction = 2 }) => {
  try {
    let separator = ',';
    if (value === '0' || value === '.000') {
      return 0;
    }
    if (value === '' || value === null || value === undefined) {
      return '0';
    }
    value = value + '';
    if (type === 'USD') {
      separator = ',';
      value = value.replace(/\./g, '.');
    } else {
      value = value.replace(/\./g, '.');
    }

    if (!value.split('.')[0]) {
      return `0.${value.split('.')[1]}`;
    }

    value = parseFloat(value).toFixed(fraction);
    const num_parts = value.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return num_parts.join('.');
  } catch (error) {
    console.log(`error formating`, error);
    return 'Failed Formating';
  }
};

export const nf = (obj, key, def, p, undef) => {
  // Safe Get Deepest of Map Data - Helper
  // (Null Fixed -> nf())
  // nf(object, keypath, [default]);
  key = key.split ? key.split('.') : key;
  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }
  return obj === undef || obj === null || obj === '' ? def : obj;
};
