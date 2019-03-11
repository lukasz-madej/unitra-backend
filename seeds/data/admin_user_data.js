const userHelper = require('../../_helpers/user-helper');

const password = 'ZAQ!2wsx';
const hashedPassword = userHelper.saltHashPassword(password);

module.exports = {
  username: 'admin',
  password: hashedPassword.hash,
  salt: hashedPassword.salt,
  active: true,
  admin: true
};
