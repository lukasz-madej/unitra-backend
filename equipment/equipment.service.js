const knex = require('knex') (require('../knexfile'));

module.exports = {
  create,
  update,
  remove,
  getById
};

async function create({ name, description, productionDate, categoryId }) {
  return await knex('equipment')
    .insert({
      name,
      description,
      productionDate,
      categoryId
    });
}

async function update({ id, name, description, productionDate, categoryId }) {
  return await knex('equipment')
    .where({ id })
    .update({
      name,
      description,
      productionDate,
      categoryId
    });
}

async function remove({ id }) {
  return await knex('equipment')
    .where({ id })
    .del()
}

async function getById({ id }) {
  return await knex('equipment').where({ id });
}