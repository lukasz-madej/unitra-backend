const express = require('express');
const validate = require('express-validation');

const setsService = require('./sets.service');
const setsValidations = require('../validations/sets');

const router = express.Router();

function getAll(request, response, next) {
  setsService.create(request.body)
    .then(sets => response.status(200).json(sets))
    .catch(error => next(error));
}

function getById(request, response, next) {
  setsService.getById(request.params)
    .then(set => {
      if(!set) {
        response.status(404).json({ message: 'Set not found' })
      } else {
        setsService.getSetMembers({ setId: set.id })
          .then(members => {
            response.json({
              ...set,
              members
            })
          })
          .catch(error => next(error));
      }
    })
    .catch(error => next(error));
}

function update(request, response, next) {
  setsService.update({ id: request.params.id, ...request.body })
    .then(set => set ?
      response.json(set) :
      response.status(404).json({ message: 'Set not found' }))
    .catch(error => next(error))
}

function create(request, response, next) {
  setsService.create(request.body)
    .then(set => response.status(201).json(set))
    .catch(error => next(error));
}

function remove(request, response, next) {
  setsService.remove(request.params)
    .then(set => response.status(200).json(set))
    .catch(error => next(error));
}

module.exports = router;

router.get('/', getAll);
router.get('/:id', validate(setsValidations.pathId), getById);
router.put('/:id', validate(setsValidations.update), update);
router.post('/', validate(setsValidations.create), create);
router.delete('/:id', validate(setsValidations.pathId), remove);
