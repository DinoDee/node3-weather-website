'use strict';

const request = require("request");

const forecast = function(latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=63747a09fd8f9d27e935d3fd0ebe1c4e&query=${latitude},${longitude}`;

  request({ url, json: true }, ( error, { body } = {} ) => {
    if(error) {
      return callback('Unable to connect to weather web services.', undefined);
    } else if(body.error) {
      return callback('Unable to find location. Invalid lon/lat parameters.');
    } else {
      const humidity = body.current.humidity;
      const precipitation = body.current.precip;
      const pressure = body.current.pressure;
      const temperature = body.current.temperature;

      return callback(undefined, {
        humidity,
        precipitation,
        pressure,
        temperature
      });
    }
  });
};

module.exports = forecast;




















//
// Lesson: Application deployment: New feature deployment workflow
//
// Challenge: Add new data to forecast
//
// 1. Update the forecast string to include new data
// 2. Commit your changes
// 3. Push your changes to GitHub and deploy to Heroku
// 4. Test your work in the live application