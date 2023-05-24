const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    images: [],
    price: {
      type: Number,
      required: true,
    },
    fieldType: {
      type: String,
      default: '5 x 5',
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Bookings = mongoose.model('bookings', bookingSchema);

module.exports = Bookings;
