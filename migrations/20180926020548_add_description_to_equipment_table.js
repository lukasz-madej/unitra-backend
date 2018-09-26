exports.up = function(knex) {
  return knex.schema.table('equipment', t => {
    t.text('description');
  })
};

exports.down = function(knex) {
  return knex.schema.table('equipment', t => {
    t.dropColumn('description');
  })
};
