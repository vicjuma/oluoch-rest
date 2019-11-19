const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const Product = require('./../../models/products');

router.get('/', (req,res,next) => {
  Product.find()
    .exec()
      .then((result) => {
        console.log(result);
        res.send(result);
      })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
});

router.post('/', (req,res,next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save()
    .then((result) => {
      console.log(result);
      res.send(result)
    })
      .catch((err) =>{
        console.log(err);
        res.send(err);
      });
});

router.get('/:id', (req,res,next) => {
  const id = req.params.id
  Product.findById({_id: id})
  .exec()
    .then((result) => {
      if(mongoose.Types.ObjectId.isValid(id)){
        res.send(result);
      }else{
        res.send('please input a valid id');
      }
    })
      .catch((err) => {
        console.error(err);
      });
});

router.patch('/:id', (req,res,next) => {
  const id = req.params.id
  res.status(200).json({
    message: `updated product with id ${id}`,
  });
});

router.delete('/:id', (req,res,next) => {
  const id = req.params.id
  res.status(200).json({
    message: `deleted product with id ${id}`,
  });
});



module.exports = router;