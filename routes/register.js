const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res, next) => {
  res.render('register');
});

router.post('/', (req, res, next) => {
  // register using api to maintain clean separation between layers
  request.post({
    url: process.env.API + '/users/register',
    form: req.body,
    json: true
  },
  (error, response, body) => {
    if (error) {
      return res.render('register', { error: error });
    }
    if (response.statusCode !== 200) {
      return res.render('register', {
        error: response.body,
        username: req.body.username
      });
    }

    // return to login page with success message
    req.session.success = 'Registration successful!';
    return res.redirect('/login');
  });
});

module.exports = router;
