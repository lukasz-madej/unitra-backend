const knex = require('knex') (require('../knexfile'));
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
  create,
  authenticate,
  getById
};

async function create({ username, password }) {
  const { salt, hash } = saltHashPassword(password);
  return await knex('users')
    .insert({
      name,
      salt,
      password: hash
    });
}

async function authenticate({ username, password }) {
  const user = getByUsername({ username });

  if (user && user.password === generateHash(password)) {
    const token = jwt.sign({ sub: user.id }, config.secret);
    const { password, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      token
    }
  }
}

async function getById({ id }) {
  return await knex('users').where({ id });
}

async function getByUsername({ username }) {
  return await knex('users').where({ username });
}

function saltHashPassword(password) {
  const salt = crypto.randomBytes(4).toString('hex');
  const hash = generateHash(password, salt);

  return {
    salt,
    hash: hash.digest('hex')
  }
}

function generateHash(password, salt) {
  return crypto.createHmac('sha512', salt).update(password);
}