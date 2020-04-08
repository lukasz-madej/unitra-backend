const joi = require('joi');

const pathId = {
  params: {
    id: joi.number().required()
  }
}

const create = {
  body: {
    name: joi.string().required(),
    productionDate: joi.date().optional(),
    description: joi.string().optional(),
    serialNumber: joi.string().optional(),
    categoryId: joi.number().optional(),
    setId: joi.number().optional()
  }
}

const update = {
  params: {
    id: joi.number().required()
  },
  body: {
    name: joi.string().required(),
    productionDate: joi.date().optional(),
    description: joi.string().optional(),
    serialNumber: joi.string().optional(),
    categoryId: joi.number().optional(),
    setId: joi.number().optional()
  }
}

const setCategory = {
  params: {
    id: joi.number().required()
  },
  body: {
    categoryId: joi.number().required()
  }
}

const setSet = {
  params: {
    id: joi.number().required()
  },
  body: {
    setId: joi.number().required()
  }
}

module.exports = {
  pathId,
  create,
  update,
  setCategory,
  setSet
};
