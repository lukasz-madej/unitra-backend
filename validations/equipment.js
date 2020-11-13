const joi = require('joi');

const pathId = {
  params: {
    id: joi.number().required()
  }
};

const create = {
  body: {
    name: joi.string().required(),
    productionDate: joi.date().optional().allow([null, '']),
    description: joi.string().optional().allow([null, '']),
    serialNumber: joi.string().optional().allow([null, '']),
    categoryId: joi.number().required(),
    setId: joi.number().optional().allow([null, '']),
    images: joi.array().items(joi.number()).optional().allow([null, ''])
  }
};

const update = {
  params: {
    id: joi.number().required()
  },
  body: {
    name: joi.string().optional().allow([null, '']),
    productionDate: joi.date().optional().allow([null, '']),
    description: joi.string().optional().allow([null, '']),
    serialNumber: joi.string().optional().allow([null, '']),
    categoryId: joi.number().optional().allow([null, '']),
    setId: joi.number().optional().allow([null, '']),
    images: joi.array().items(joi.number()).optional().allow([null, ''])
  }
};

const setCategory = {
  params: {
    id: joi.number().required()
  },
  body: {
    categoryId: joi.number().required()
  }
};

const setSet = {
  params: {
    id: joi.number().required()
  },
  body: {
    setId: joi.number().required()
  }
};

module.exports = {
  pathId,
  create,
  update,
  setCategory,
  setSet
};
