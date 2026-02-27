const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// Get available rides for drivers (NO POPULATE - fixes User error)
router.get('/rides', async (req, res) => {
  try {
    console.log('🔍 Fetching available rides...');
    const availableRides = await Ride.find({
      status: 'requested',
      driver: null
    });
    console.log(`✅ Found ${availableRides.length} available rides`);
    res.json(availableRides);
  } catch (error) {
    console.error('❌ Driver rides error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Driver accepts ride
router.post('/rides/:rideId/accept', async (req, res) => {
  try {
    const { driverId } = req.body;
    const ride = await Ride.findById(req.params.rideId);
    
    if (!ride || ride.status !== 'requested') {
      return res.status(400).json({ error: 'Ride not available' });
    }
    
    ride.driver = driverId || 'driver_001';
    ride.status = 'accepted';
    await ride.save();
    
    console.log(`✅ Driver ${driverId} accepted ride ${ride._id}`);
    res.json({ message: 'Ride accepted', ride });
  } catch (error) {
    console.error('❌ Accept ride error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
