const joi = require('joi');

const authenticate = {
  body: {
    username: joi.string().required(),
    password: joi.string().required()
  }
};

const create = {
  body: {
    username: joi.string().required(),
    password: joi.string().required(),
    admin: joi.bool().optional()
  }
}

const pathId = {
  params: {
    id: joi.number().required()
  }
}

module.exports = {
  authenticate,
  create,
  pathId
};
