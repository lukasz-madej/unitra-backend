const expressJwt = require('express-jwt');
const pathToRegexp = require('path-to-regexp');

const config = require('../config');

const jwt = () => {
  const { secret } = config;
  const unprotected = [{
    url: pathToRegexp('/users/authenticate'),
    methods: ['POST']
  }, {
    url: pathToRegexp('/users/create'),
    methods: ['POST']
  }];

  return expressJwt({ secret })
    .unless({
      path: unprotected
    });
}

module.exports = jwt;
