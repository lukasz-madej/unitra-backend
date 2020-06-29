const knex = require('knex') (require('../knexfile'));

const create = async ({ name, description }) =>
  knex('sets')
    .insert({
      name,
      description
    })
    .then(async ([id]) => {
      return Promise.resolve({ status: 201, body: await getById(id) })
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Set not created' })
    });

const update = async ({ id, name, description }) =>
  knex('sets')
    .where({ id })
    .update({
      name,
      description
    })
    .then(async () => Promise.resolve({ status: 200, body: await getById(id) }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Set not found' })
    });

const remove = async ({ id }) =>
  knex('sets')
    .where({ id })
    .del()
    .then(() => Promise.resolve({ status: 204 }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Set not found' })
    });

const get = async ({ id }) =>
  getById(id)
    .then(async (set) => {
      const members = await getMembers(set.id);

      return Promise.resolve({ status: 201, body: { ...set, members } })
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Set not found' })
    });

const getAll = async () =>
  knex('sets')
    .then((sets) => Promise.resolve({ status: 201, body: sets }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Sets not found' })
    });

const getMembers = async (setId) =>
  knex('equipment')
    .where({ setId })

const getById = async (id) =>
  knex('sets').where({ id }).first()

module.exports = {
  create,
  update,
  remove,
  getAll,
  get
};
