const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bearer = require('../auth/bearer');
const passportGoogle = require('../auth/google');
const Listing = require ('../models/listing');
const User = require ('../models/user');
const Chat = require ('../models/chat');










module.exports = router;
