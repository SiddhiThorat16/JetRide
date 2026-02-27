const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your-email@gmail.com
    pass: process.env.EMAIL_PASS  // app password
  }
});

// Get user ride history
router.get('/my-rides', async (req, res) => {
  try {
    const rides = await Ride.find({ rider: req.user?.id || null })
      .sort({ createdAt: -1 })
      .populate('driver', 'name phone');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get driver ride history
router.get('/driver-rides', async (req, res) => {
  try {
    const rides = await Ride.find({ driver: req.user?.id || null })
      .sort({ createdAt: -1 })
      .populate('rider', 'name phone');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate & send receipt
router.post('/rides/:rideId/receipt', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId).populate('rider');
    
    const receipt = {
      rideId: ride._id,
      pickup: ride.pickup.address,
      dropoff: ride.dropoff.address,
      fare: ride.fare,
      status: ride.status,
      date: ride.updatedAt,
      rider: ride.rider.email
    };

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ride.rider.email,
      subject: `JetRide Receipt - Ride ${ride._id}`,
      html: `
        <h2>JetRide Receipt</h2>
        <p><strong>Ride ID:</strong> ${ride._id}</p>
        <p><strong>From:</strong> ${ride.pickup.address}</p>
        <p><strong>To:</strong> ${ride.dropoff.address}</p>
        <p><strong>Fare:</strong> ₹${ride.fare}</p>
        <p><strong>Status:</strong> ${ride.status.toUpperCase()}</p>
        <p><strong>Date:</strong> ${new Date(ride.updatedAt).toLocaleString()}</p>
      `
    });

    res.json({ message: 'Receipt sent', receipt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
