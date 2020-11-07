var express = require('express');
var app = express();
const indexController = require('../controller/index.controller');

app.get('/', indexController.get);

module.exports = app;