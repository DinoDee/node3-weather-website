'use strict';

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for the Express.js configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up 'handlebars' engine and 'views' location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use( express.static( publicDirectoryPath ) );

// The root route
app.get('', (req, res) => {
  res.render('index', {
    developer: "Dino Covic",
    title: "Weather"
  });
});

// The '/about' route
app.get('/about', (req, res) => {
  res.render('about', {
    developer: "Dino Covic",
    title: "About Me"
  });
});

// The '/help' route
app.get('/help', (req, res) => {
  res.render('help', {
    developer: "Dino Covic",
    helpMsg: "Search through the FAQ before creating a new thread.",
    title: "Help",
  });
});

// The '/help/contact' route
app.get('/help/contact', (req, res) => {
  res.send('Contact Information');
});

// The '/weather' route
app.get('/weather', (req, res) => {
  if(!req.query.address) { // if the 'address' key was not specified in a query string
    return res.send({ // return a response that contains an error message
      error: "Location address must be specified and valid."
    });
  }
  // otherwise, fetch the forecast data
  geocode(req.query.address, ( error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send( { error } );
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send( { error } );
      }

      res.send({
        address: req.query.address,
        forecast: forecastData,
        location
      });
    });
  });
});

// The '/products' route
app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: "You must provide a 'search' term."
    });
  }
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    developer: "Dino Dee",
    errorMessage: "Help article not found.",
    title: "Help 404"
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    developer: "Dino Dee",
    errorMessage: "Web page not found.",
    title: "404"
  });
});

// app.com                  - root route
// app.com/help             - route
// app.com/about            - route

// The app.listen method starts up the web server, and listens for incoming requests at the specified port.
// The optional callback function is called as soon as the web server starts.
// A common development port is 3000.

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});














//
// Lesson: Web servers: Hello Express
//
// Challenge: Set up two new routes
//
// 1. Set up an 'about page' route and render a page title
// 2. Set up a weather route and render a page title
// 3. Test your work by visiting both in the browser

//
// Lesson: Web servers: Serving up HTML and JSON
//
// Challenge: Update routes
//
// 1. Set up an 'about' route to render up an HTML title
// 2. Set up a 'weather' route to send back JSON
//    - Object with forecast and location strings
// 3. Test your work by visiting both in the browser

//
// Lesson: Web servers: Serving up static assets
//
// Challenge: Create two more HTML files
//
// 1. Create an html page for 'about' with 'About' title
// 2. Create an html page for 'help' with 'Help' title
// 3. Remove the old route handlers for both
// 4. Visit both in the browser to test your work

// 
// Lesson: Web servers: Dynamic web pages with templating
//
// Challenge: Create a template for help page
//
// 1. Set up a help template to render a help message to the screen
// 2. Set up the '/help' route and render the template with the example message
// 3. Visit the help route in the browser and see you help message print

//
// Lesson: Web servers: Advanced templating
//
// Challenge: Create a partial template for the footer
//
// 1. Set up a template for the footer partial "Created by Some Name"
// 2. Render the partial at the bottom of all three web pages
// 3. Test your work by visiting all three web pages

//
// Lesson: Web servers: 404 Pages
//
// Challenge: Create and render a 404 web page with handlebars
//
// 1. Set up the template to render the header and footer
// 2. Set up the template to render an error message in a paragraph
// 3. Render the template for both 404 routes:
//    - Page not found
//    - Help article not found
// 4. Test your work. Visit /what and /help/units

//
// Lesson: Accessing API from the web browser: The query string
//
// Challenge: Update the 'weather' endpoint to accept an address in a query string
//
// 1. No address? Send back an error message
// 2. Address? Send back a static JSON
//    - Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=philadelphia

//
// Lesson: Accessing API from web browser: Building a JSON HTTP endpoint
//
// Challenge: Wire up /weather
//
// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast and location