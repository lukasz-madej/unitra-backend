const knex = require('knex') (require('../knexfile'));

const create = async ({ name, description, productionDate, categoryId, setId, serialNumber }) =>
  knex('equipment')
    .insert({
      name,
      description,
      productionDate,
      categoryId,
      setId,
      serialNumber
    })
    .then(async ([ id ]) => {
      return Promise.resolve({ status: 201, body: await getById(id) })
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not created' })
    });

const update = async (id, body) =>
  knex('equipment')
    .where({ id })
    .update({
      ...body
    })
    .then(async () => Promise.resolve({ status: 200, body: await getById(id) }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not found' })
    });

const remove = async ({ id }) =>
  knex('equipment')
    .where({ id })
    .del()
    .then((equipment) => Promise.resolve({ status: 204 }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not found' })
    });

const get = async ({ id }) =>
  getById(id)
    .then((equipment) => Promise.resolve({ status: 200, body: equipment }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not found' })
    });

const getAll = async () =>
  knex('equipment')
    .select()
    .then((equipment) => Promise.resolve({ status: 200, body: equipment }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not found' })
    });

const getById = async (id) =>
  knex('equipment').where({ id }).first();

module.exports = {
  create,
  update,
  remove,
  get,
  getAll
};
