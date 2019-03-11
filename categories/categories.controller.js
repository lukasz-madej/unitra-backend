const express = require('express');

const categoriesService = require('./categories.service');

const router = express.Router();

module.exports = router;

router.get('/:id', getById)
router.get('/', getAll);
router.post('/:id', update);
router.put('/', create);
router.delete('/:id', remove);


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
