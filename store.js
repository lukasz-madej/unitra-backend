const knex = require('knex') (require('./knexfile'));

module.exports =  {
  createEquipment({ name, productionDate }) {
    console.log(`createEquipment: ${name} ${productionDate}`);
    return knex('equipment').insert({
      name,
      productionDate
    })
  }
};