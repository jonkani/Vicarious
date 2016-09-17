'use strict';

/* eslint-disable camelcase */
exports.seed = function(knex) {
  return knex('users_favorites').del()
    .then(() => {
      return knex('users_favorites').insert([{
        id: 1,
        user_id: 1,
        favorite_id: 1
      }]);
    })
    .then(() => {
      return knex.raw(

        // eslint-disable-next-line max-len
        "SELECT setval('users_favorites_id_seq', (SELECT MAX(id) FROM users_favorites));"
      );
    });
};
