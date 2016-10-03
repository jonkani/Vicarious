/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const app = require('../server');

suite('user route', () => {
  const password = 'johnjohn';

  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('POST api/users', (done) => {
    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        email: 'john@john.john',
        password
      })
      .expect(200)
      .end((httpErr, _res) => {
        if (httpErr) {
          return done(httpErr);
        }

        knex('users')
          .where('id', 2)
          .first()
          .then((user) => {
            const hashedPassword = user.hashed_password;

            delete user.hashed_password;
            delete user.created_at;
            delete user.updated_at;

            assert.deepEqual(user, {
              id: 2,
              email: 'john@john.john'
            });

            // eslint-disable-next-line no-sync
            const isMatch = bcrypt.compareSync(password, hashedPassword);

            assert.isTrue(isMatch, "passwords don't match");
            done();
          })
          .catch((dbErr) => {
            done(dbErr);
          });
      });
  });
});
