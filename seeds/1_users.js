'use strict';

/* eslint-disable camelcase */
exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        email: 'vic@vicarious.com',
        hashed_password:
          '$2a$12$4UE7FVElHiap0yRqBX.t8.SYBp7fJZYi5snkIuyy/jK3lqTiYl/0m'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
