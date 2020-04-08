const express = require('express');
const validate = require('express-validation');

const equipmentService = require('./equipment.service');
const equipmentValidations = require('../validations/equipment');

const router = express.Router();

const getById = (request, response, next) => {
  equipmentService.get(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const getAll = (request, response, next) => {
  equipmentService.getAll()
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const create = (request, response, next) => {
  equipmentService.create(request.body)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const update = (request, response, next) => {
  equipmentService.update(request.params.id, request.body)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const remove = (request, response, next) => {
  equipmentService.remove(request.params)
    .then(result => response.status(result.status))
    .catch(error => response.status(error.status).json(error));
}

const setCategory = (request, response, next) => {
  equipmentService.update(request.params.id, { categoryId: request.body.categoryId })
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const setSet = (request, response, next) => {
  equipmentService.update(request.params.id, { setId: request.body.setId })
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

module.exports = router;

router.get('/:id', validate(equipmentValidations.pathId), getById);
router.get('/', getAll);
router.put('/:id', validate(equipmentValidations.update), update);
router.post('/', validate(equipmentValidations.create), create);
router.delete('/:id', validate(equipmentValidations.pathId), remove);
router.patch('/set-category/:id', validate(equipmentValidations.setCategory), setCategory);
router.patch('/set-set/:id', validate(equipmentValidations.setSet), setSet);
