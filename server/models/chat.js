const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  listingId: {type: Schema.Types.ObjectId, ref: 'Listing', required: true},
  renterId: {type: Number, required: true},
  renterName: {type: String, required: true},
  renteeId: {type: Number, required: true},
  renteeName: {type: String, required: true},

  chat: [{
    sentBy: {type: String, required: true},
    date: {type: Date, required: true},
    message: {type: String, required: true}
  }]
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
