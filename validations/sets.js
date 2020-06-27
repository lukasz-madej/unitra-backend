const joi = require('joi');

const pathId = {
  params: {
    id: joi.number().required()
  }
};

const create = {
  body: {
    name: joi.string().required(),
    description: joi.string().optional()
  }
};

const update = {
  params: {
    id: joi.number().required()
  },
  body: {
    name: joi.string().optional(),
    description: joi.string().optional()
  }
};

module.exports = {
  pathId,
  create,
  update
};
