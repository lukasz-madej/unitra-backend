const express = require('express');
const validate = require('express-validation');

const setsService = require('./sets.service');
const setsValidations = require('../validations/sets');

const router = express.Router();

const getAll = async (request, response, next) => {
  setsService.create(request.body)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const getById = async (request, response, next) => {
  setsService.get(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const update = async (request, response, next) => {
  setsService.update({ id: request.params.id, ...request.body })
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const create = async (request, response, next) => {
  setsService.create(request.body)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const remove = async (request, response, next) => {
  setsService.remove(request.params)
    .then(result => response.status(result.status))
    .catch(error => response.status(error.status).json(error));
}

module.exports = router;

router.get('/', getAll);
router.get('/:id', validate(setsValidations.pathId), getById);
router.put('/:id', validate(setsValidations.update), update);
router.post('/', validate(setsValidations.create), create);
router.delete('/:id', validate(setsValidations.pathId), remove);
