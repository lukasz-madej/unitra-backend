exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary();
    t.string('username').notNullable();
    t.unique('username');
    t.string('password').notNullable();
    t.string('salt').notNullable();
    t.boolean('active').defaultTo(true);
    t.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
