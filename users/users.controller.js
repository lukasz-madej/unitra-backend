const express = require('express');
const validate = require('express-validation');

const usersService = require('./users.service');
const usersValidations = require('../validations/users');

const router = express.Router();

const get = (request, response, next) => {
  usersService.get(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const getCurrent = (request, response, next) => {
  usersService.getCurrent(request.headers.authorization)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const authenticate = (request, response, next) => {
  usersService.authenticate(request.body)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error))
}

const create = (request, response, next) => {
  usersService.create(request.body)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error))
}

const activate = (request, response, next) => {
  usersService.activate(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const deactivate = (request, response, next) => {
  usersService.deactivate(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

module.exports = router;

router.get('/current', getCurrent);
router.post('/authenticate', validate(usersValidations.authenticate), authenticate);
router.post('/create', validate(usersValidations.create), create);
router.patch('/activate/:id', validate(usersValidations.pathId), activate);
router.patch('/deactivate/:id', validate(usersValidations.pathId), deactivate);
router.get('/:id', validate(usersValidations.pathId), get);
