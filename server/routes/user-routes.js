const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bearer = require('../auth/bearer');
const User = require('../models/user');
const passportGoogle = require('../auth/google');


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

module.exports = router;
