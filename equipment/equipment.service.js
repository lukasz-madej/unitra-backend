const knex = require('knex') (require('../knexfile'));

module.exports = {
  create,
  update,
  remove,
  getById,
  getAll
};

async function create({ name, description, productionDate, categoryId }) {
  return knex('equipment')
    .insert({
      name,
      description,
      productionDate,
      categoryId
    });
}

async function update({ id, name, description, productionDate, categoryId }) {
  return knex('equipment')
    .where({ id })
    .update({
      name,
      description,
      productionDate,
      categoryId
    });
}

async function remove({ id }) {
  return knex('equipment')
    .where({ id })
    .del()
}

async function getById({ id }) {
  return knex('equipment').where({ id }).first();
}

async function getAll() {
  return knex('equipment').select();
}
