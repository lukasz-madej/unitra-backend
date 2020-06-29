const express = require('express');
const validate = require('express-validation');

const categoriesService = require('./categories.service');
const categoriesValidations = require('../validations/categories');

const router = express.Router();

const getById = (request, response, next) => {
  categoriesService.get(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
};

const getAll = (request, response, next) => {
  categoriesService.getAll()
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
};

const update = (request, response, next) => {
  categoriesService.update({ id: request.params.id, ...request.body })
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
};

const create = (request, response, next) => {
  categoriesService.create(request.body)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
};

const remove = (request, response, next) => {
  categoriesService.remove(request.params)
    .then(result => response.status(result.status))
    .catch(error => response.status(error.status).json(error));
};

module.exports = router;

router.get('/:id', validate(categoriesValidations.pathId), getById)
router.get('/', getAll);
router.put('/:id', validate(categoriesValidations.update), update);
router.post('/', validate(categoriesValidations.create), create);
router.delete('/:id', validate(categoriesValidations.pathId), remove);
