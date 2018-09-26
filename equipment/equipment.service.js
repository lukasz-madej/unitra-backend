const knex = require('knex') (require('../knexfile'));

module.exports = {
  create,
  update,
  getById
};

async function create({ name, description, productionDate }) {
  return await knex('equipment')
    .insert({
      name,
      description,
      productionDate
    });
}

async function update({ id, name, description, productionDate }) {
  return await knex('equipment')
    .where({ id })
    .update({
      name,
      description,
      productionDate
    });
}

async function getById({ id }) {
  return await knex('equipment').where({ id });
}