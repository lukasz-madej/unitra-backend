exports.up = function(knex) {
  return knex.schema.createTable('images', t => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('location').notNullable();
    t.integer('size').defaultTo(0);
    t.timestamps(false, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('images');
};
