exports.up = function(knex) {
  return knex.schema.table('users', t => {
    t.boolean('admin').defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema.table('users', t => {
    t.dropColumn('admin');
  })
};
