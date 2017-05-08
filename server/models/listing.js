const mongoose = require('mongoose');


const ListingSchema = mongoose.Schema({
  _creator: { type: Number, ref: 'User' },
  title: {type: String, required: true},
  categories: {type: Array, required: false},
  price: {type: Number, required: true},
  product_url: {type: String, required: true},
  images: {type: Array, required: false}
});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
