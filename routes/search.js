'use strict';

const express = require('express');
const axios = require('axios');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/search', (req, res, next) => {
  const { maxLat, minLat, maxLon, minLon } = req.query;
  const key = process.env.API_KEY;
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&group_id=44671723%40N00&extras=original_format%2Cgeo%2Curl_o&format=json&nojsoncallback=1`;

  axios.get(url)
    .then((response) => {
      let photos = response.data.photos.photo;

      photos = photos.filter((photo) => {
        return photo.originalformat && Number.parseInt(photo.width_o) < 12000;
      });
      photos = photos.map((photo) => {
        const {
          title,
          id,
          server,
          farm,
          originalsecret,
          originalformat,
          latitude,
          longitude
        } = photo;

        return {
          title,
          id,
          server,
          farm,
          originalSecret: originalsecret,
          originalFormat: originalformat,
          latitude,
          longitude
        };
      });
      res.send(photos);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
