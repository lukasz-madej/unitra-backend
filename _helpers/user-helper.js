const crypto = require('crypto');

module.exports = {
  saltHashPassword,
  generateHash
}

function saltHashPassword(password) {
  const salt = crypto.randomBytes(4).toString('hex');
  const hash = generateHash(password, salt);

  return {
    salt,
    hash: hash.digest('hex')
  }
}

function generateHash(password, salt) {
  return crypto.createHmac('sha512', salt).update(password);
}
