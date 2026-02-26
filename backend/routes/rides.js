const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// Get all rides (dev only)
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find().populate('rider driver');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create ride request
router.post('/', async (req, res) => {
  try {
    const ride = new Ride(req.body);
    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
