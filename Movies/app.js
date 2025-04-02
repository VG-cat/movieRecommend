require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Router = require('./routes');
const cors = require('cors');
var cookieParser = require('cookie-parser');

const app = express();

app.use('/uploads', express.static('uploads'));

// 中间件
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
    .use(cors())
    .use(cookieParser())
app.get('/', function (req, res) {
    res.send('it works');
})


app.get('/movies', function (req, res) {
    res.send('it is movies comments');
})

app.use('/api/v1', Router)

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
})



module.exports = app;