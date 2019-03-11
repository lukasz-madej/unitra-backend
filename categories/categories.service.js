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
  return await knex('categories')
    .insert({
      name,
      description
    });
}

async function update({ id, name, description }) {
  return await knex('categories')
    .where({ id })
    .update({
      name,
      description
    });
}

async function remove({ id }) {
  return await knex('categories')
    .where({ id })
    .del();
}

async function getById({ id }) {
  return await knex('categories').where({ id });
}

async function getAll() {
  return await knex('categories').select();
}

async function removeCategoryRelations(id) {
  return await knex('equipment')
    .where({ categoryId: id })
    .update({
      categoryId: 0
    });
}
