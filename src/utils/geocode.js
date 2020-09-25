'use strict';

const request = require('request');

const geocode = function(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGlub2NvdmljIiwiYSI6ImNrZjltZ2FseDBmN3AycWxkY254MWJ6Y2oifQ.C3fHqzlobe8Elf6Iklsw8Q&limit=1`;

  request({ url, json: true }, ( error, { body } ) => {
    if(error) {
      callback('Unable to connect to location web services.', undefined);
    } else if(body.features.length === 0) {
      callback('Unable to find location.', undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;