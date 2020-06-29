const knex = require('knex') (require('../knexfile'));

const get = async ({ id }) =>
  getById(id)
    .then((category) => Promise.resolve({ status: 201, body: category }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Category not found' })
    });

const getAll = async () =>
  knex('categories').select()
    .then((categories) => Promise.resolve({ status: 201, body: categories }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Category not found' })
    });

const create = async ({ name, description }) =>
  knex('categories')
    .insert({
      name,
      description
    })
    .then(async ([id]) => Promise.resolve({ status: 201, body: await getById(id) }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Category not created' })
    });

const  update = async ({ id, name, description }) =>
  knex('categories')
    .where({ id })
    .update({
      name,
      description
    })
    .then(async () => Promise.resolve({ status: 200, body: await getById(id) }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Category not found' })
    });

const remove = async ({ id }) =>
  knex('categories')
    .where({ id })
    .del()
    .then(() => Promise.resolve({ status: 204 }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Category not found' })
    });

const getById = async (id) =>
  knex('categories').where({ id }).first();

module.exports = {
  create,
  update,
  remove,
  get,
  getAll
};
