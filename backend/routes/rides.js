const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// Get all rides
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find().populate('rider driver', 'name email');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create ride request - FIXED UNDEFINED FARE
router.post('/', async (req, res) => {
  try {
    console.log('Full request body:', req.body);
    
    // SAFE ACCESS - Check if body and fare exist
    const fare = req.body?.fare || 250;
    const pickup = req.body?.pickup || {};
    const dropoff = req.body?.dropoff || {};
    
    const rideData = {
      pickup,
      dropoff,
      fare,
      status: req.body?.status || 'requested',
      rider: req.body?.rider || null
    };
    
    console.log('Processed rideData:', rideData);
    
    const ride = new Ride(rideData);
    await ride.save();
    
    console.log('✅ Ride saved:', ride._id);
    res.status(201).json(ride);
  } catch (error) {
    console.error('❌ Ride error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
