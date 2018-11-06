const express = require('express');
const router = express.Router();
const setsService = require('./sets.service');

module.exports = router;

router.put('/create', create);
router.post('/update/:id', update);
router.get('/get', getAll);
router.get('/get/:id', getById);
router.get('/get/:id/members', getByIdWithMembers);
router.delete('/remove/:id', remove);

function create(request, response, next) {
  setsService.create(request.body)
    .then(set => response.status(201).json(set))
    .catch(error => next(error));
}

function update(request, response, next) {
  setsService.update({ id: request.params.id, ...request.body })
    .then(set => set ?
      response.json(set) :
      response.status(404).json({ message: 'Set not found' }))
    .catch(error => next(error))
}

function getAll(request, response, next) {
  setsService.create(request.body)
    .then(sets => response.status(200).json(sets))
    .catch(error => next(error));
}

function getById(request, response, next) {
  setsService.getById(request.params)
    .then(set => set ?
      response.json(set) :
      response.status(404).json({ message: 'Set not found' }))
    .catch(error => next(error));
}

function getByIdWithMembers(request, response, next) {
  setsService.getById(request.params)
    .then(set => set ?
      response.json(set) :
      response.status(404).json({ message: 'Set not found' }))
    .catch(error => next(error));
}

function remove(request, response, next) {
  setsService.remove(request.params)
    .then(set => response.status(200).json(set))
    .catch(error => next(error));
}
