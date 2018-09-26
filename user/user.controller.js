const express = require('express');
const router = express.Router();
const userService = require('./user.service');

module.exports = router;

router.post('/authenticate', authenticate);
router.post('/create', create);
router.get('/get/:id', getById);

function authenticate(request, response, next) {
  userService.authenticate(request.body)
    .then(user => user ?
      response.json(user) :
      response.status(400).json({ message: 'Invalid username or password' }))
    .catch(error => next(error));
}

function create(request, response, next) {
  userService.create(request.body)
    .then(user => response.status(201).json(user))
    .catch(error => next(error));
}

function getById(request, response, next) {
  userService.getById(request.params)
    .then(user => user ?
      response.json(user) :
      response.status(404).json({ message: 'User not found' }))
    .catch(error => next(error));
}