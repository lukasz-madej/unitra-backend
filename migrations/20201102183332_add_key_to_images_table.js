exports.up = function(knex) {
  return knex.schema.table('images', t => {
    t.string('key').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.table('images', t => {
    t.dropColumn('key');
  })
};
