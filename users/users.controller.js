const express = require('express');
const validate = require('express-validation');

const userService = require('./users.service');
const userValidations = require('../validations/users');

const router = express.Router();

const get = (request, response, next) => {
  userService.get(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const authenticate = (request, response, next) => {
  userService.authenticate(request.body)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error))
}

const create = (request, response, next) => {
  userService.create(request.body)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error))
}

const activate = (request, response, next) => {
  userService.activate(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const deactivate = (request, response, next) => {
  userService.deactivate(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

module.exports = router;

router.get('/:id', validate(userValidations.pathId), get);
router.post('/authenticate', validate(userValidations.authenticate), authenticate);
router.post('/create', validate(userValidations.create), create);
router.patch('/activate/:id', validate(userValidations.pathId), activate);
router.patch('/deactivate/:id', validate(userValidations.pathId), deactivate);
