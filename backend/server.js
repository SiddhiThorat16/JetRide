require('dotenv').config();  // LINE 1 - CRITICAL!

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

console.log('DEBUG MONGODB:', process.env.MONGODB_URI ? '✅ LOADED' : '❌ MISSING');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/rides', require('./routes/rides'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/history', require('./routes/history'));
app.use('/api/ratings', require('./routes/ratings'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

app.get('/api/health', (req, res) => res.json({ message: 'JetRide Backend Live!' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend on http://localhost:${PORT}`));
