const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');

const database = {
    DATABASE_URL: global.secret.DATABASE_URL
};

passport.use(
  new GoogleStrategy({
    clientID: global.secret.CLIENT_ID,
    clientSecret: global.secret.CLIENT_SECRET,
    callbackURL: `/api/auth/google/callback`
  },
  (accessToken, refreshToken, profile, cb) => {

    const user = database[accessToken] = {
      googleID: profile.id,
      accessToken: accessToken
    };

    const searchQuery = {
      googleID: profile.id
    };

    const updates = {
      name: profile.displayName,
      accessToken: accessToken,
      googleID: profile.id
    };

    const options = {
      upsert: true,
      new: true
    };

    User.findOneAndUpdate(searchQuery, {$set: updates}, options, (err, user) => {
      if (err) {
        console.log(err);
        return cb(err);
      }
      else {
        return cb(null, user);
      }
    });
  })
);

module.exports = passport;
