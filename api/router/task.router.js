var express = require('express');
var app = express();

var TaskController = require('../controller/task.controller');

app.get('/:idUsuario', TaskController.get);
app.get('/tarea/:id', TaskController.getID);
app.put('/:id', TaskController.edit);
app.delete('/:id', TaskController.delete);
app.post('/', TaskController.create);

module.exports = app;