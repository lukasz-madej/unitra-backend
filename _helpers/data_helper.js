const removeEmptyProperties = (obj) => {
  return Object.entries(obj)
    .reduce((accumulator, [key, value]) => (value ? {...accumulator, [key]: value} : accumulator), {})
};

module.exports = {
  removeEmptyProperties
};
