'use strict';

console.log('Client-side JS file is loaded');

const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('form input');
const responseStatus = document.querySelector('#response-status');
const responseBody = document.querySelector('#response-body');

weatherForm.addEventListener('submit', event => {
  event.preventDefault();

  const location = weatherInput.value;

  // Render the 'Loading...' message before fetching the request
  responseStatus.textContent = 'Loading...';
  // Clear any prior data
  responseBody.textContent = '';

  fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`)
    .then( response => response.json() )
    .then( data => {
      if(data.error) {
        throw data.error;
      }

      const { address, forecast: {precipitation, temperature}, location} = data;

      responseStatus.textContent = '';
      responseBody.textContent = 
`Address: ${address}
Precipitation: ${precipitation}
Temperature: ${temperature}
Location: ${location}
`;
    })
    .catch( error => { 
      responseStatus.textContent = '';
      responseBody.textContent = error;
    });
});

























//
// Lesson: Accessing API from the web browser: Browser http requests with 'fetch'
//
// Challenge: Fetch weather
//
// 1. Set up a call to 'fetch' to fetch weather for Boston
// 2. Get the parse JSON response
//    - If error property, print error
//    - If no error property, print location and forecast
// 3. Refresh the browser and test your work

//
// Lesson: Accessing API from the web browser: Creating a search form
//
// Challenge: Use input value to get weather
//
// 1. Migrate fetch call into the submit callback
// 2. Use the search text as the address query string value
// 3. Submit the form with a valid and invalid input to test

//
// Lesson: Accessing API from the web browser: Wiring up the UI
//
// Challenge: Render content to paragraphs
//
// 1. Select the second message p from JavaScript
// 2. Just before fetch, render loading message and empty p
// 3. If error, render error
// 4. If no error, render location and forecast
// 5. Test your work! Search for errors and valid locations