const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  googleID: {type: Number, required: true},
  name: {type: String, required: true},
  accessToken: {type: String, required: true},
  listings: [{type: Schema.Types.ObjectId, ref: 'Listing'}],
  ratings: [{type: Schema.Types.ObjectId, ref: 'Rating'}]

});

const User = mongoose.model('User', UserSchema);


module.exports = User;
