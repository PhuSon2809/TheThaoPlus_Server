const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    dateBooking: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    hours: {
      type: String,
      required: true,
    },
    tracking: {
      type: String,
      default: 'Booked',
    },
    // information user don have account have booking
    userBooking: {
      type: String,
    },
    phoneBooking: {
      type: String,
    },
    //
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      require: true,
    },
    sportCenter: {
      type: Schema.Types.ObjectId,
      ref: 'sportCenters',
      require: true,
    },
    sportField: {
      type: Schema.Types.ObjectId,
      ref: 'sportFields',
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
