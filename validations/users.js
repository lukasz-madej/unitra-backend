const joi = require('joi');

const authenticate = {
  body: {
    username: joi.string().required(),
    password: joi.string().required()
  }
};

module.exports = {
  authenticate
};
