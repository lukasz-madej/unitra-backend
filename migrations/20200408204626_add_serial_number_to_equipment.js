exports.up = function(knex) {
  return knex.schema.table('equipment', t => {
    t.string('serialNumber');
  })
};

exports.down = function(knex) {
  return knex.schema.table('equipment', t => {
    t.dropColumn('serialNumber');
  })
};
