'use strict';

const request = require("request");

const forecast = function(latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=63747a09fd8f9d27e935d3fd0ebe1c4e&query=${latitude},${longitude}`;

  request({ url, json: true }, ( error, { body } ) => {
    if(error) {
      callback('Unable to connect to weather web services.', undefined);
    } else if(body.error) {
      callback('Unable to find location. Invalid lon/lat parameters.');
    } else {
      const precipitation = body.current.precip;
      const temperature = body.current.temperature;

      callback(undefined, {
        precipitation,
        temperature
      });
    }
  });
};

module.exports = forecast;