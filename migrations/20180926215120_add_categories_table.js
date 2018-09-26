exports.up = function(knex) {
  return knex.schema.createTable('categories', t => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('description');
    t.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('categories');
};
