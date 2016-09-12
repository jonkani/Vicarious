'use strict';

const express = require('express');
const request = require('request');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/search', (req, res, next) => {
  const { maxLat, minLat, maxLon, minLon } = req.query;
  const key = process.env.API_KEY;
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&group_id=44671723%40N00&extras=original_format&format=json&nojsoncallback=1`;
  const options = { url, method: 'GET' };

  request(options, (err, _res, body) => {
    if (err) {
      // eslint-disable-next-line no-console
      next(err);
    }
    const parsed = JSON.parse(body);
    let photos = parsed.photos.photo;

    photos = photos.filter((photo) => {
      return photo.originalformat;
    });

    res.send(photos);
  });
});

module.exports = router;
