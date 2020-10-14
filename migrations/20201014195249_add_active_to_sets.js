exports.up = function(knex) {
  return knex.schema.table('sets', t => {
    t.boolean('active').defaultTo(true);
  })
};

exports.down = function(knex) {
  return knex.schema.table('sets', t => {
    t.dropColumn('active');
  })
};
