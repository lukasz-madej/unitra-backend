const knex = require('knex') (require('../knexfile'));

const categoriesService = require('../categories/categories.service');
const setsService = require('../sets/sets.service');

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
    .then(async ([id]) => {
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
    .then(() => Promise.resolve({ status: 204 }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not found' })
    });

const get = async ({ id }) =>
  getById(id)
    .then(async (equipment) => {
      console.log(equipment);
      console.log(id);
      const category = equipment.categoryId ?
        await categoriesService.get({ id: equipment.categoryId }).then(categoryResponse => categoryResponse.body) :
        null;
      const set = equipment.setId ?
        await setsService.get({ id: equipment.setId }).then(setResponse => setResponse.body) :
        null;
      const { setId, categoryId, ...equipmentResponse } = equipment;

      return Promise.resolve({ status: 200, body: { ...equipmentResponse, category, set } })
    })
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
