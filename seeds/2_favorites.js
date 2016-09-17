'use strict';

/* eslint-disable camelcase */
exports.seed = function(knex) {
  return knex('favorites').del()
    .then(() => {
      return knex('favorites').insert([{
        id: 1,
        image_id: '1122347141',
        title: 'The Oh-hori Park',
        server: 1186,
        farm: 2,
        original_secret: '677bf4b1a1',
        original_format: 'jpg',
        latitude: '33.5885656',
        longitude: '130.375744'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('favorites_id_seq', (SELECT MAX(id) FROM favorites));"
      );
    });
};
