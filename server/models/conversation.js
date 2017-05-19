const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  listing: { type: Schema.Types.ObjectId, ref: 'Listing' },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Conversation = mongoose.model('Conversation', ConversationSchema);


module.exports = Conversation;



//req.user
// { _id: 5915f8fd27acf5eeeef2d048,
//   googleID: 101551739169578010000,
//   __v: 0,
//   accessToken: 'ya29.GltLBF8CaD7qPthqF9L6eSDhd6QM_ZjGNhDBhg3F0ulkxP3HTQ113NLpb9fJIMukon8XewyYEd6T_Ivmf13kv-jcoa4XQlIPMV360wfZPSuW71mDg6yWWPtT9DqZ',
//   name: 'Aaron G',
//   ratings: [],
//   listings: []
// }
