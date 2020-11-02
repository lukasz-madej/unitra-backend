exports.up = function(knex) {
  return knex.schema.table('images', t => {
    t.string('type');
    t.integer('parentId').nullable();
    t.boolean('active').defaultTo(true);
  })
};

exports.down = function(knex) {
  return knex.schema.table('images', t => {
    t.dropColumn('type');
    t.dropColumn('parentId');
    t.dropColumn('active');
  })
};
