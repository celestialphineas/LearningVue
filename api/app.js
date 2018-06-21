const bodyParser    = require('body-parser');
const config        = require('../config/conf.server');
const cors          = require('cors');
const data          = require('./data');
const user          = require('./user');
const express       = require('express');
const app           = express();

// Static
app.use('', express.static('../dist'));
app.use('', express.static('../static'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cross domain
app.use(cors());

// Data API
app.use(config.getApiPath('data'), data);
app.use(config.getApiPath('user'), user);

module.exports = app;
