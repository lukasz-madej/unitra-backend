const expressJwt = require('express-jwt');
const pathToRegexp = require('path-to-regexp');

const jwt = () => {
  const unprotected = [{
    url: pathToRegexp('/users/authenticate'),
    methods: ['POST']
  }, {
    url: pathToRegexp('/users/create'),
    methods: ['POST']
  }];

  return expressJwt({ secret: process.env.SECRET })
    .unless({
      path: unprotected
    });
}

module.exports = jwt;
