const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Ride = require('../models/Ride');

// Submit rating for driver - SIMPLIFIED (no auth required for testing)
router.post('/submit', async (req, res) => {
  try {
    console.log('Rating data:', req.body);
    
    const { rideId, driverId, score, comment } = req.body;
    
    // Create temp driver if doesn't exist
    let driver = await User.findOne({ role: 'driver' });
    if (!driver) {
      driver = new User({
        clerkId: 'driver_001',
        name: 'Test Driver',
        email: 'driver@test.com',
        role: 'driver'
      });
      await driver.save();
    }
    
    const rating = {
      score: parseInt(score),
      comment,
      rider: null, // Temp
      rideId
    };
    
    driver.ratings = driver.ratings || [];
    driver.ratings.push(rating);
    driver.totalRatings = driver.ratings.length;
    driver.rating = driver.ratings.reduce((sum, r) => sum + r.score, 0) / driver.ratings.length;
    
    await driver.save();
    console.log('✅ Rating saved:', driver.rating);
    
    res.json({ message: 'Rating submitted', driver });
  } catch (error) {
    console.error('❌ Rating error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
