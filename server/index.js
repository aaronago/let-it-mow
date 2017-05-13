const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
mongoose.Promise = global.Promise;

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL
};

if(process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}

global.secret = secret;

const routes = require('./routes/user-routes');

const listRoutes = require('./routes/listing-routes');

const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.use(busboyBodyParser({ limit: '10mb'}));

app.use(passport.initialize());

app.use('/api/auth', routes);

app.use('/api', listRoutes);
// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(db=secret.DATABASE_URL, port=3001) {
    return new Promise((resolve, reject) => {
      mongoose.connect(db, err => {
        if(err) {
          return reject(err);
        }
        console.log('Successfully Connected to DB');

        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
      });
    });
}

function closeServer(db=secret.DATABASE_URL) {
    return new Promise((resolve, reject) => {
        mongoose.connect(db, err => {});
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer, secret
};
