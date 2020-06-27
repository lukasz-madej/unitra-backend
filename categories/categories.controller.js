const express = require('express');
const validate = require('express-validation');

const categoriesService = require('./categories.service');
const categoriesValidations = require('../validations/categories');

const router = express.Router();

function getById(request, response, next) {
  categoriesService.getById(request.params)
    .then(category => response.status(201).json(category))
    .catch(error => next(error));
}

function getAll(request, response, next) {
  categoriesService.getAll()
    .then(categories => response.status(201).json(categories))
    .catch(error => next(error));
}

function update(request, response, next) {
  categoriesService.update({ id: request.params.id, ...request.body })
    .then(category => category ?
      response.json(category) :
      response.status(404).json({ message: 'Category not found' }))
    .catch(error => next(error))
}

function create(request, response, next) {
  categoriesService.create(request.body)
    .then(category => response.status(201).json(category))
    .catch(error => next(error));
}

function remove(request, response, next) {
  categoriesService.remove(request.params)
    .then(categoriesService.removeCategoryRelations(request.params.id))
    .then(category => response.status(200).json(category))
    .catch(error => next(error));
}

module.exports = router;

router.get('/:id', validate(categoriesValidations.pathId), getById)
router.get('/', getAll);
router.put('/:id', validate(categoriesValidations.update), update);
router.post('/', validate(categoriesValidations.create), create);
router.delete('/:id', validate(categoriesValidations.pathId), remove);
