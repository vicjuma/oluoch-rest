const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
  res.status(200).json({
    message: 'these are all the orders you have made so far'
  });
});

router.post('/', (req,res,next) => {
  const order = {
    orderID : req.body.orderID,
    qty: req.body.qty
  };
  res.status(201).json({
    message: 'these are all the orders you created',
    order: order
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