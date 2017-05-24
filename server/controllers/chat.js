const mongoose = require('mongoose');
const Conversation = require('../models/conversation');
const Message = require('../models/message');
const User = require('../models/user');
const Listing = require('../models/listing');

mongoose.Promise = global.Promise;

exports.getConversations = (req, res, next) => {
  Conversation
    .find({ participants: req.user._id })
    .populate({
      path: 'listing',
      select: 'title images price'
    })
    .exec()
    .then(conversations => {
      let fullConversations = conversations.map(conversation => {
        return Message.find({ 'conversationId': conversation._id})
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'author',
            select: 'name profilePic'
          })
          .exec()
          .then( messages => ({listing: conversation.listing, message: messages}));
      });
      return Promise.all(fullConversations);
    })
    .then(allConversations => {
      return res.status(200).json({ conversations: allConversations });
    })
    .catch(err => res.send(err));
};

exports.getConversation = (req, res, next) => {
  Message.find({ conversationId: req.params.conversationId })
    .sort('createdAt')
    .populate({
      path: 'author',
      select: 'name profilePic'
    })
    .exec()
    .then(messages => {
      res.status(200).json({messages: messages});
    })
    .catch(err => res.send(err));
};

exports.newConversation = (req, res, next) => {

  const conversation = new Conversation({
    listing: req.body.listingId,
    participants: [req.user._id, req.body.createdBy]
  });

  conversation.save()
    .then(newConvo => {
      const message = new Message({
        conversationId: newConvo._id,
        author: req.user._id,
        body: req.body.message,
        read: false
      });
      return message.save();
    })
    .then(newMessage => {
      res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id, newMessage: newMessage });
    })
    .catch(err => res.send({ error: err}));
};

exports.sendReply = (req, res, next) => {

  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.message,
    author: req.user._id,
    read: false
  });

  reply.save()
    .then(message => {
      res.status(200).json({ message: message });
    })
    .catch(err => res.send({ error: err }));
};

exports.markRead = (req, res, next) => {

  Message.findOne({ _id: req.params.conversationId })
    .then(message => {
        return Message.findOneAndUpdate({ _id: message._id }, {$set: { read: true }}, { new: true });
    })
    .then(updatedMessage => res.status(200).json({messages: updatedMessage}))
}
// Message.findOne({ _id: req.params.conversationId })
//   .then(messages => {
//     const updates = messages.map(message => {
//       return Message.findOneAndUpdate({ _id: message._id }, {$set: { read: true }}, { new: true });
//     })
//     return Promise.all(updates)
//   })
//   .then(updatedMessages => res.status(200).json({messages: updatedMessages}))
// }
