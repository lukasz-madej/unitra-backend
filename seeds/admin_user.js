const adminData = require('./data/admin_user_data');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert(adminData);
    });
};
