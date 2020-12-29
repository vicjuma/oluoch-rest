const express = require('express');
const pug = require('pug');
const logger = require('morgan');
const bodyParser = require('body-parser');                                                                                                                                                             
const userRoute = require('./api/routes/users');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join('public')));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/', userRoute);


app.use((req,res,next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error); //parsing execution forward to avoid hanging
});

app.use((err,req,res,next) => {
  res.status(err.status || 500).json({error: err.message});
});

module.exports = app;
