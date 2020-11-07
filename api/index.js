require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//Base de datos;

const { dbConection } = require('./database/config');

const indexRouter = require('./router/index.router');
const userRouter = require('./router/user.router');
const taskRouter = require('./router/task.router');
const loginRouter = require('./router/login.router');

// Creamos el servidor de express
const app = express();

//Configurar Cors
app.use(cors());

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Coneccióm

dbConection();
app.use('/', indexRouter);
app.use('/api/usuarios/', userRouter);
app.use('/api/task/', taskRouter);
app.use('/api/login/', loginRouter);

app.listen(process.env.PORT, () => {
    console.log("Express server puerto "+process.env.PORT+": \x1b[32m%s\x1b[0m   ", " online");
});