var express = require('express');
var app = express();
const loginController = require('../controller/login.controller');

app.post('/', loginController.login);

module.exports = app;