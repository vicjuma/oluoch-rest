const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');  
const mongoose = require('mongoose');                                                                                                                                                              
const prodRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we are connected to mongoDB database');
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/products', prodRoute);
app.use('/orders', orderRoute);

app.use((req,res,next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((err,req,res,next) => {
  res.status(err.status || 500).json({error: err.message});
});

module.exports = app;