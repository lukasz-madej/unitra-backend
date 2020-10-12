module.exports = {
  client: 'mysql',
  connection: {
    user: 'unitra',
    password: 'Passw0rd!',
    database: 'unitra',
    typeCast: (field, next) => {
      if (field.type === 'TINY' && field.length === 1) {
        const value = field.string();
        return value ? value === '1' : null;
      }
      return next();
    }
  }
};
