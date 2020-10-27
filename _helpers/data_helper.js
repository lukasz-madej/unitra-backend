const removeEmptyProperties = (obj) => {
  return Object.entries(obj)
    .reduce((accumulator, [key, value]) => (value ? {...accumulator, [key]: value} : accumulator), {})
};

const getFirstSecondForYear = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();

  return new Date(year, 1, 1, 0, 0, 0);
}

const getLastSecondForYear = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();

  return new Date(year, 11, 31, 23, 59, 59);
}

module.exports = {
  removeEmptyProperties,
  getFirstSecondForYear,
  getLastSecondForYear
};
