'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection:
      'postgres://localhost/vicarious_dev'
  },

  test: {
    client: 'pg',
    connection:
      'postgres://localhost/vicarious_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
