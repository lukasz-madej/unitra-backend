const expressJwt = require('express-jwt');
const config = require('../config');

module.exports = jwt;

function jwt() {
  const { secret } = config;

  return expressJwt({ secret }).unless({
    path: [
      '/users/authenticate'
    ]
  });
}