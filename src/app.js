require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');
const rateLimiter = require('./utils/rateLimiter');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(rateLimiter);

// API Routes
app.use('/', urlRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
