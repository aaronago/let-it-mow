const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = mongoose.Schema({
  listingId: {type: Schema.Types.ObjectId, ref: 'Listing', required: true},
  renter: {
    id: {type: Number, required: true},
    name: {type: String, required: true}
  },
  rentee: {
    id: {type: Number, required: true},
    name: {type: String, required: true}
  },
  chat: {type: Array, required: true}
});

const Chat = mongoose.model('Chat', ChatSchema);


module.exports = Chat;

// {
//   listingId: 83748723648732576450,
//   renterName: 'John Smith',
//   Rentee: 'Jane Mow',
//   chat: [
//     {
//       sentBy: 'Jane Mow',
//       message: 'Hi there. Is this still available?',
//       sentDate: '09/12/17 00:12:13',
//     }
//   ]
// }
