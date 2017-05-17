const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bearer = require('../auth/bearer');
const passportGoogle = require('../auth/google');
const Listing = require ('../models/listing');
const User = require ('../models/user');
const chatController = require('../controllers/chat');

mongoose.Promise = global.Promise;

const bearerAuth = passportGoogle.authenticate('bearer', {session: false});

router.get('/', bearerAuth, chatController.getConversations);

router.get('/:conversationId', bearerAuth, chatController.getConversation);

router.post('/new', bearerAuth, chatController.newConversation);

router.post('/', bearerAuth, chatController.sendReply);





module.exports = router;
