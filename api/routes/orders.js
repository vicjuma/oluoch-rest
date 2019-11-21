const express = require('express');
const mongoose = require('mongoose');
const Order = require('../../models/orders');
const Product = require('./../../models/products');
const router = express.Router();

router.get('/', (req,res,next) => {
  Order.find()
    .select('_id productID qty')
      .exec()
        .then((result) => {
          const results = {
            count: result.length,
            orders: result.map((resultt) => {
              return {
                productID: resultt.productID,
                id: resultt._id,
                qty: resultt.qty,
                request: {
                  type: 'GET',
                  url: `localhost:3000/orders/${resultt._id}`
                }
              }
            })
          }
          res.status(200).send(results);
        }).catch((err) => {
          res.status(500).json({err});
        });
});

router.post('/', (req,res,next) => {
  const order = new Order({
    _id : mongoose.Types.ObjectId(),
    productID: req.body.productID,
    qty: req.body.qty
  });
  Product.findById(req.body.productID)
    .then((product) => {
    return order.save()
    .then((result) => {
      res.status(201).send({
        orderID: result._id,
        productID: result.productID,
        qty: result.qty,
        request: {
          type: 'POST',
          url: `localhost:3000/orders/${result._id}`
        }
      });
    })
    .catch((err) => {
      res.json({error: err});
    });
    })
      .catch((err) => {
        res.status(500).json({error: `there is no such product in the db ${err}`})
      });
});

router.get('/:id', (req,res,next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `this is order ${id}`
  });
});

router.put('/:id', (req,res,next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `you updated order ${id}`
  });
});

router.delete('/:id', (req,res,next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `you deleted order ${id}`
  });
});

module.exports = router;