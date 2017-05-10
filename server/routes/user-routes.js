const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bearer = require('../auth/bearer');
const passportGoogle = require('../auth/google');
const bodyParser = ('body-parser');

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

router.get('/api/listings', (req, res) => {
  Listing
    .find()
    .exec()
    .then(listings => {
      res.json(listings);
    })
    .catch(err => {
      res.status(500).json({error: 'something went wrong'});
    });
});

router.get('/api/listings/:id', (req, res) => {
  Listing
    .find({_id: req.params.id})
    .exec()
    .then(listing => {
      res.json(listing);
    })
    .catch(err => {
      res.status(500).json({error: 'something went wrong'});
    });
});

router.delete('/api/listings/:createBy/:id', passportGoogle.authenticate('bearer', {session: false}),
  (req, res) => {
    Listing
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(() => {
        res.status(200).json({message: 'success'});
      })
      .catch(err => {
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

router.put('/api/listings/:createBy/:id', passportGoogle.authenticate('bearer', {session: false}),
  (req, res) => {
    if(!(req.params.id && req.body._id && req.params.id === req.body._id)) {
      res.status(400).json({
        error:'Request path id and request body id values must match'
      });
    }
    const updated = {};
    const canBeUpdated = ['title', 'price', 'categories', 'images'];
    canBeUpdated.forEach(field => {
      if (field in req.body) {
        updated[field] = req.body[field];
      }
    });

    Listing
      .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
      .exec()
      .then(updatedListing => res.status(201).json(updatedListing))
      .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

module.exports = router;
