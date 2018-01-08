// Dependencies
var mongojs = require('mongojs');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var logger = require('morgan');
var mongoose = require('mongoose');

// Scraping Tools
var cheerio = require('cheerio');
// var axios = require('axios');

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger('dev'));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));

// Require all models
var db = require('./models');

// Handlebars setup
// Serve static content for the app from the "public" directory in the application directory
app.use(express.static('public'));

// Set default handlebars template
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
// app.set('view engine', path.join(__dirname, 'app/views'), 'handlebars');
app.set('view engine', 'handlebars');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database    
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newNewsNow";

// Mongoose setup
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// VARIABLES
// ==========================================
// Add the time when scrape is completed
var scrapeTime = new Date(Date.now()).toLocaleString();


// ROUTING
// ==========================================

// Main route, renders Handlebars index
var routes = require('./controller/api-routes.js');
app.use('/', routes);