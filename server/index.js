const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const socketEvents = require('./socketEvents');

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

const chatRoutes = require('./routes/chat-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',  '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(passport.initialize());

app.use('/api/auth', routes);

app.use('/api/chat', chatRoutes);

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
      mongoose.connect(db || process.env.DATABASE_URL, err => {
        if(err) {
          return reject(err);
        }
        console.log('Successfully Connected to DB');

        var httpServer = require('http').Server(app);
        var io = require('socket.io')(httpServer);

        server = httpServer.listen(port);
          socketEvents(io);

        resolve();
      });
    })
    .catch((err) => console.log(err));
}

function closeServer(db=secret.DATABASE_URL) {
    return new Promise((resolve, reject) => {
        mongoose.connect(db || process.env.DATABASE_URL, err => {});
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
