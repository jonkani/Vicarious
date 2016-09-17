'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users_favorites', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.integer('favorite_id')
      .notNullable()
      .references('id')
      .inTable('favorites')
      .onDelete('CASCADE')
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_favorites');
};
