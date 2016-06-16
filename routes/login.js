const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res, next) => {
  //log user out
  delete req.session.token;

  //move success message into local variable so it only appears once (single read)
  const viewData = req.session.success ;
  delete req.session.success;

  res.render('login', { success: viewData });
});

router.post('/', (req, res, next) => {
  // authenticate using api to maintain clean separation between layers
  request.post({
    url: process.env.API + '/users/authenticate',
    body: req.body,
    json: true
  },
  (error, response, body) => {
    if (error) {
      return res.render('login', { error: error });
    }
    if (!body.token) {
      return res.render('login', { error: response.body, username: req.body.username });
    }

    // save JWT token in the session to make it available to the angular app
    req.session.token = body.token;

    // redirect to returnUrl
    const returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
    res.redirect(returnUrl);
  });
});

module.exports = router;
