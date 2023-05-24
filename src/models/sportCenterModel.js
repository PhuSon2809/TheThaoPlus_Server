const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sportCenterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/thethaoplus-4d4e2.appspot.com/o/sport.png?alt=media&token=2d2c6703-5121-4242-9841-3b41fa9eaba1',
    },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longtitude: {
      type: String,
      required: true,
    },
    openTime: {
      type: String,
      required: true,
    },
    closeTime: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
    sport: {
      type: Schema.Types.ObjectId,
      ref: 'sports',
      require: true,
    },
    sportFields: [
      {
        type: Schema.Types.ObjectId,
        ref: 'sportFields',
      },
    ],
  },
  { timestamps: true }
);

const SportCenters = mongoose.model('sportCenters', sportCenterSchema);

module.exports = SportCenters;
