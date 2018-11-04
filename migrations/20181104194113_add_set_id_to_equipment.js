exports.up = function(knex) {
  return knex.schema.table('equipment', t => {
    t.integer('setId').defaultTo(0);
  })
};

exports.down = function(knex) {
  return knex.schema.table('equipment', t => {
    t.dropColumn('setId');
  })
};
