const knex = require('knex') (require('../knexfile'));
const jwt = require('jsonwebtoken');

const config = require('../config');
const userHelper = require('../_helpers/user-helper');

module.exports = {
  create,
  authenticate,
  getById
};

async function create({ username, password }) {
  const { salt, hash } = userHelper.saltHashPassword(password);
  return await knex('users')
    .insert({
      name,
      salt,
      password: hash
    });
}

async function authenticate({ username, password }) {
  const user = await getByUsername({ username });

  if (user && user.password === userHelper.generateHash(password, user.salt).digest('hex')) {
    const token = jwt.sign({ sub: user.id }, config.secret);
    const { password, ...userWithoutPassword } = user;

    return Promise.resolve({
      user: userWithoutPassword,
      token
    });
  } else {
    return Promise.reject({ status: 401, error: 'Invalid username or password' });
  }
}

async function getById({ id }) {
  return await knex('users').where({ id }).first();
}

async function getByUsername({ username }) {
  return await knex('users').where({ username }).first();
}
