const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bearer = require('../auth/bearer');
const passportGoogle = require('../auth/google');

const User = require('../models/user');
const Listing = require ('../models/listing');

mongoose.Promise = global.Promise;

router.get('/api/auth/google',
    passportGoogle.authenticate('google', {scope: ['profile']}));

router.get('/api/auth/google/callback',
    passportGoogle.authenticate('google', {
      failureRedirect: '/',
      session: false
    }),
    (req, res) => {
      res.cookie('accessToken', req.user.accessToken, {expires: 0});
      res.redirect('/');
    }
);

router.get('/api/me',
    passportGoogle.authenticate('bearer', {session: false}),
    (req, res) => res.json({googleId: req.user.googleId})
);

router.post('/api/new-listing', passportGoogle.authenticate('bearer', {session: false}), (req, res) => {
  const listingDetails = {
    createdBy: req.user.googleID,
    title: req.body.title,
    categories: req.body.categories,
    price: req.body.price
  };

  Listing.create(listingDetails)
    .then(listing => {
      res.status(200).json({listing});
    })
    .catch(err => {
      res.status(500).json({err: err});
    });
});

module.exports = router;
