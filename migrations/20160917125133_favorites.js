'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments();
    table.string('image_id').unique().notNullable().defaultTo('');
    table.string('title').unique().notNullable().defaultTo('');
    table.integer('server').notNullable().defaultTo(0);
    table.integer('farm').notNullable().defaultTo(0);
    table.string('original_secret').notNullable().defaultTo('');
    table.string('original_format').notNullable().defaultTo('');
    table.string('latitude').notNullable().defaultTo('');
    table.string('longitude').notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
};
