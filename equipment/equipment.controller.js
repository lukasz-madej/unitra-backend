const express = require('express');
const router = express.Router();
const equipmentService = require('./equipment.service');

module.exports = router;

router.get('/:id', getById);
router.get('/', getAll);
router.post('/:id', update);
router.put('/', create);
router.delete('/:id', remove);
router.patch('/set-category/:id', setCategory)

function getById(request, response, next) {
  equipmentService.getById(request.params)
    .then(equipment => equipment ?
      response.json(equipment) :
      response.status(404).json({ message: 'Equipment not found' }))
    .catch(error => next(error));
}

function getAll(request, response, next) {
  equipmentService.getAll()
    .then(equipment => response.status(201).json(equipment))
    .catch(error => next(error));
}

function create(request, response, next) {
  equipmentService.create(request.body)
    .then(equipment => response.status(201).json(equipment))
    .catch(error => next(error));
}

function update(request, response, next) {
  equipmentService.update({ id: request.params.id, ...request.body })
    .then(equipment => equipment ?
      response.json(equipment) :
      response.status(404).json({ message: 'Equipment not found' }))
    .catch(error => next(error))
}

function remove(request, response, next) {
  equipmentService.remove(request.params)
    .then(equipment => response.status(200).json(equipment))
    .catch(error => next(error));
}

function setCategory(request, response, next) {
  equipmentService.update({ id: request.params.id, categoryId: request.body.categoryId })
    .then(equipment => equipment ?
      response.json(equipment) :
      response.status(404).json({ message: 'Equipment not found' }))
    .catch(error => next(error))
}
