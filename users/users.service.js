const knex = require('knex') (require('../knexfile'));
const jwt = require('jsonwebtoken');

const config = require('../config');
const userHelper = require('../_helpers/user-helper');

const create = async ({ username, password, admin = false }) => {
  const { salt, hash } = userHelper.saltHashPassword(password);
  return knex('users')
    .insert({
      username,
      salt,
      password: hash,
      admin
    })
    .then(async ([id]) => Promise.resolve({ status: 201, body: getUserResponse(await getById(id)) }))
    .catch(() => Promise.reject({ status: 409, message: 'Username is taken' }))
};

const authenticate = async ({ username, password }) => {
  const user = await getByUsername(username);

  if (user && user.active && user.password === userHelper.generateHash(password, user.salt).digest('hex')) {
    const token = jwt.sign({ sub: user.id }, config.secret);

    return Promise.resolve({
      status: 200,
      body: {
        user: getUserResponse(user),
        token
      }
    });
  } else {
    return Promise.reject({ status: 401, message: 'Invalid username or password' });
  }
};

const activate = async ({ id }) => {
  return knex('users')
    .where({ id })
    .update({
      active: false
    })
    .then(async ([id]) => Promise.resolve({ status: 200, body: getUserResponse(await getById(id)) }))
    .catch(() => Promise.reject({ status: 404, message: 'User not found' }))
};

const deactivate = async ({ id }) => {
  return knex('users')
    .where({ id })
    .update({
      active: false
    })
    .then(async ([id]) => Promise.resolve({ status: 200, body: getUserResponse(await getById(id)) }))
    .catch(() => Promise.reject({ status: 404, message: 'User not found' }))
};

const get = async ({ id }) => {
  return getById(id)
    .then((user) => Promise.resolve({ status: 200, body: getUserResponse(user) }))
    .catch(() => Promise.reject({ status: 404, message: 'User not found' }))
};

const getByUsername = async (username) =>
  knex('users').where({ username }).first();

const getById = async (id) =>
  knex('users').where({ id }).first();

const getUserResponse = (user) => {
  const { password, slat, ...userResponse } = user;
  return userResponse;
};

module.exports = {
  create,
  authenticate,
  get,
  activate,
  deactivate
};
