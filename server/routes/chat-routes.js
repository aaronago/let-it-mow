const express = require('express');
const router = express.Router();
const bearer = require('../auth/bearer');
const passportGoogle = require('../auth/google');
const chatController = require('../controllers/chat');


const bearerAuth = passportGoogle.authenticate('bearer', {session: false});

router.get('/', bearerAuth, chatController.getConversations);

router.get('/:conversationId', bearerAuth, chatController.getConversation);

router.post('/new', bearerAuth, chatController.newConversation);

router.post('/:conversationId', bearerAuth, chatController.sendReply);

router.put('/:conversationId', chatController.markRead);





module.exports = router;
