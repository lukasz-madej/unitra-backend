exports.up = function(knex) {
  return knex.schema.createTable('equipment', t => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('productionDate').notNullable();
    t.timestamps(false, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('equipment');
};
