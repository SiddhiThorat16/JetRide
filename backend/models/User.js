const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['rider', 'driver'], default: 'rider' },
  name: String,
  phone: String,
  rating: { type: Number, default: 5, min: 1, max: 5 },
  ratings: [{
    score: { type: Number, min: 1, max: 5 },
    comment: String,
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }
  }],
  totalRatings: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
