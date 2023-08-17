const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainName: {
    type: String,
    required: true
  },
  trainNumber: {
    type: String,
    required: true,
    unique: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  seatsAvailableAC: {
    type: Number,
    required: true
  },
  seatsAvailableSleeper: {
    type: Number,
    required: true
  },
  priceAC: {
    type: Number,
    required: true
  },
  priceSleeper: {
    type: Number,
    required: true
  }
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
