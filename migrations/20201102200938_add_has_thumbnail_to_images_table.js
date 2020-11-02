exports.up = function(knex) {
  return knex.schema.table('images', t => {
    t.boolean('hasThumbnail').defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema.table('images', t => {
    t.dropColumn('hasThumbnail');
  })
};
