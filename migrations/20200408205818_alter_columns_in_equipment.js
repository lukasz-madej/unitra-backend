exports.up = function(knex) {
  return knex.schema.alterTable('equipment', t => {
    t.date('productionDate').alter();
    t.integer('categoryId').unsigned().references('id').inTable('categories').onDelete('SET NULL').alter();
    t.integer('setId').unsigned().references('id').inTable('sets').onDelete('SET NULL').alter();
  })
};

exports.down = function(knex) {
  return knex.schema.table('equipment', t => {
    t.string('productionDate');
    t.dropForeign(['categoryId', 'setId']);
  })
};
