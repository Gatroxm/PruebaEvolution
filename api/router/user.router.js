var express = require('express');
var app = express();

const userController = require('../controller/usuario.controller');

app.get('/', userController.get);
app.get('/:id', userController.getId);
app.post('/', userController.create);
app.put('/:id', userController.update);
app.delete('/:id', userController.delete);

module.exports = app;