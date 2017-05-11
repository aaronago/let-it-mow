const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListingSchema = mongoose.Schema({
  title: {type: String, required: true},
  categories: {type: Array, required: false},
  price: {type: Number, required: true},
  product_url: {type: String, required: false},
  images: {type: Array, required: false},
  zipcode: {type: Number, required: false},
  createdBy: {
    type: Number,
    ref: 'User',
    required: true
  },
  position: {type: Object, required: false}
});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
