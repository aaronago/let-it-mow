const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema ({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});


const ListingSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: false
  },
  price: {
    type: Number,
    required: true
   },
  product_url: {
    type: String,
    required: false
  },
  images: {
    type: Array,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  geometry: GeoSchema
},
{
  timestamps: true
});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
