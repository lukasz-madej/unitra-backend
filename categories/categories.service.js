const knex = require('knex') (require('../knexfile'));

module.exports = {
  create,
  update,
  remove,
  getById,
  getAll,
  removeCategoryRelations
};

async function create({ name, description }) {
  return knex('categories')
    .insert({
      name,
      description
    });
}

async function update({ id, name, description }) {
  return knex('categories')
    .where({ id })
    .update({
      name,
      description
    });
}

async function remove({ id }) {
  return knex('categories')
    .where({ id })
    .del();
}

async function getById({ id }) {
  return knex('categories').where({ id }).first();
}

async function getAll() {
  return knex('categories').select();
}

async function removeCategoryRelations(id) {
  return knex('equipment')
    .where({ categoryId: id })
    .update({
      categoryId: 0
    });
}
