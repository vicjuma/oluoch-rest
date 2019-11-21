const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const Product = require('./../../models/products');

router.get('/', (req,res,next) => {
  Product.find()
  .select('name price _id')
    .exec()
      .then((result) => {
        const results = {
          count: result.length,
          products: result.map((resultt) => {
            return {
              name: resultt.name,
              price: resultt.price,
              id: resultt._id,
              request: {
                type:'GET',
                url:`localhost:3000/products/${resultt._id}`
              },
            };
          })
        };
        res.send(results);
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
      res.send({
        name: result.name,
        price: result.price,
        id: result._id,
        request: {
          type: 'POST',
          url: `localhost:3000/products/${result._id}`
        }
      })
    })
      .catch((err) =>{
        console.log(err);
        res.send(err);
      });
});

router.get('/:id', (req,res,next) => {
  const id = req.params.id
  if(mongoose.Types.ObjectId.isValid(id)){
    Product.findById({_id: id})
    .select('name price _id')
    .exec()
      .then((result) => {
        if(result){
          res.send({
            product: result,
            request: {
              type: 'GET',
              desc: 'GET all products',
              url: 'localhost:3000/products'
            }
          });
        }else{
          res.send('there is no entry');
        }
      })
        .catch((err) => {
          console.error(err);
        });
  }else{
    res.status(400).json({error: 'please input a valid id'});
  }
 
});

router.patch('/:id', (req,res,next) => {
  const id = req.params.id;
  const product = new Product({
    _id: id,
    name: req.body.name,
    price: req.body.price
  });

  Product.update({_id: id}, {$set: product})
    .then((result) => {
      res.status(200).send(result);
    })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
});

router.delete('/:id', (req,res,next) => {
  const id = req.params.id
  Product.deleteOne({_id: id})
    .then((result) => {
      res.status(201).send(result);
    })
      .catch((err) => {
        console.error(err);
      });
});



module.exports = router;