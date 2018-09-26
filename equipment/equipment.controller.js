const express = require('express');
const router = express.Router();
const equipmentService = require('./equipment.service');

module.exports = router;

router.post('/create', create);
router.post('/update/:id', update);
router.get('/get/:id', getById);

function create(request, response, next) {
  equipmentService.create(request.body)
    .then(equipment => response.status(201).json(equipment))
    .catch(error => next(error));
}

function update(request, response, next) {
  equipmentService.update({ id: request.params.id, ...request.body })
    .then(equipment => equipment ?
      response.json(equipment) :
      response.status(404).json({ message: 'Equipment to update not found' }))
    .catch(error => next(error))
}

function getById(request, response, next) {
  equipmentService.getById(request.params)
    .then(equipment => equipment ?
      response.json(equipment) :
      response.status(404).json({ message: 'Equipment not found' }))
    .catch(error => next(error));
}