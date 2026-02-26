const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickup: {
    address: String,
    lat: Number,
    lng: Number
  },
  dropoff: {
    address: String,
    lat: Number,
    lng: Number
  },
  status: { type: String, enum: ['requested', 'accepted', 'ongoing', 'completed', 'cancelled'], default: 'requested' },
  fare: { type: Number, required: true },
  distance: Number,
  duration: Number
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
