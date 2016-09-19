'use strict';

const express = require('express');
const boom = require('boom');
const knex = require('../knex');
const { checkAuth } = require('./middleware');
const bcrypt = require('bcrypt-as-promised');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/users', (req, res, next) => {
  const { email, password } = req.body;

  knex('users')
    .select(knex.raw('1=1'))
    .where('email', email)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.create(400, 'Email already exists.');
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const newUser = { email, hashedPassword };
      const row = decamelizeKeys(newUser);

      return knex('users')
        .insert(row);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/favorites', checkAuth, (req, res, next) => {
  knex('favorites')
    .innerJoin('users_favorites', 'favorite_id', 'favorites.id')
    .select(
      'title',
      'image_id as id',
      'server',
      'farm',
      'original_format',
      'original_secret',
      'latitude',
      'longitude'
    )
    .where('user_id', req.token.userId)
    .then((response) => {
      res.send(camelizeKeys(response));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users/favorites', checkAuth, (req, res, next) => {
  const {
    title,
    id,
    server,
    farm,
    originalSecret,
    originalFormat,
    latitude,
    longitude
  } = req.body;
  const userId = Number.parseInt(req.token.userId);

  knex('favorites')
    .select('id')
    .where('image_id', id)
    .first()
    .then((imgId) => {
      if (imgId) {
        return imgId.id;
      }

      const newFavorite = {
        title,
        imageId: id,
        server,
        farm,
        originalSecret,
        originalFormat,
        latitude,
        longitude
      };

      return knex('favorites')
        .insert(decamelizeKeys(newFavorite), 'id');
    })
    .then((favId) => {
      const favoriteId = Number.parseInt(favId);
      const userFavorite = { userId, favoriteId };

      return knex('users_favorites')
      .insert(decamelizeKeys(userFavorite));
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
