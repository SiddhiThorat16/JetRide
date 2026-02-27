const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/api/rides', require('./routes/rides'));
app.use('/api/drivers', require('./routes/drivers'));

app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Basic route
app.get('/api/health', (req, res) => res.json({ message: 'JetRide Backend Live!' }));

// Models & Routes (below)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend on http://localhost:${PORT}`));
