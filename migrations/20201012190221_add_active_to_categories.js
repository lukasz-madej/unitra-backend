exports.up = function(knex) {
  return knex.schema.table('categories', t => {
    t.boolean('active').defaultTo(true);
  })
};

exports.down = function(knex) {
  return knex.schema.table('categories', t => {
    t.dropColumn('active');
  })
};
