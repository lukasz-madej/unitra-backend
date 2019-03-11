const expressJwt = require('express-jwt');
const pathToRegexp = require('path-to-regexp');

const config = require('../config');

module.exports = jwt;

function jwt() {
  const { secret } = config;
  const unprotected = [
    '/users/authenticate',
    '/users/create'
  ]

  return expressJwt({ secret }).unless({
    path: unprotected.map(path => pathToRegexp(path))
  });
}
