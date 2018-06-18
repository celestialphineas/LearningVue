const bodyParser    = require('body-parser');
const config        = require('../config/path.api');
const data          = require('./data');
const express       = require('express');
const app           = express();

// Static
app.use('', express.static('../dist'));
app.use('', express.static('../static'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Data API
app.use(config.getApiPath('data'), data);

module.exports = app;