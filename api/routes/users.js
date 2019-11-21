const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./../../models/users');
const router = express.Router();

router.post('/signup', (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
      .then((user) => {
        if(user.length >= 1){
          return res.status(409).json('user already exists')
        }else{
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return new Error('there was a problem hashing the password');
            }else{
              const user = new User({
                _id: new mongoose.Types.ObjectId,
                email: req.body.email,
                password: hash
              });
              user.save()
            .then((result) => {
              res.status(201).json({
                message: "user created successfully",
                user: result
              });
            }).catch((err) => {
              res.status(401).json({err});
            });
            }
          });
        }
      }).catch()
  // creating a new user
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  User.remove({_id: id})
    .exec()
      .then((result) => res.send(result))
        .catch(err => res.send(err));
});

module.exports = router;