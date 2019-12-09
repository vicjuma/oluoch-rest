const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');  
const mongoose = require('mongoose');                                                                                                                                                              
const prodRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const userRoute = require('./api/routes/users');
const app = express();
const cors = require('cors');
const path = require('path');

// mongodb://myUserName:MyPassword@ElasticIP:27017/databaseName?authSource=admin

mongoose.connect(`mongodb+srv://vik:vik@rest-0wmlu.mongodb.net/test?authSource=admin?retryWrites=true&w=majority`, { useNewUrlParser: true }).then(() => {
  console.log('connected to the database')
}).catch(err => console.log('could not connect to the database', err));

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join('public')));

app.use('/products', prodRoute);
app.use('/orders', orderRoute);
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
  res.sendFile('index.html', () => {
    console.log('sent');
  });
});

app.use((req,res,next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error); //parsing execution forward to avoid hanging
});

app.use((err,req,res,next) => {
  res.status(err.status || 500).json({error: err.message});
});

module.exports = app;
