import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.js';  // Note the .js extension
import { rateLimiterMiddleware } from './utils/rateLimiter.js';  // Named import


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(rateLimiterMiddleware);  // Use the middleware for rate limiting

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
