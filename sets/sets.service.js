const knex = require('knex') (require('../knexfile'));

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  getByIdWithMembers
}

async function create({ name, description }) {
  return await knex('sets')
    .insert({
      name,
      description
    });
}

async function update({ id, name, description }) {
  return await knex('sets')
    .where({ id })
    .update({
      name,
      description
    });
}

async function remove({ id }) {
  return await knex('sets')
    .where({ id })
    .del();
}

async function getAll() {
  return await knex('sets');
}

async function getById({ id }) {
  return await knex('sets')
    .where({ id }).first();
}

async function getByIdWithMembers({ id }) {
  return await knex('sets')
    .where({ id })
    .leftJoin('equipment', 'sets.id', 'equipment.setId')
    .first();
}
