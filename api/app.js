const bodyParser    = require('body-parser');
const config        = require('../config/path.api');
const data          = require('./data');
const express       = require('express');
const cors          = require('cors');
const app           = express();

// Static
app.use('', express.static('../dist'));
app.use('', express.static('../static'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cross domain
var whitelist = ['localhost:8080', 'localhost', 'http://celestialphineas.github.io', 'https://celestialphineas.github.io'];
var corsOptions = {
    origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors());

// Data API
app.use(config.getApiPath('data'), data);

module.exports = app;
