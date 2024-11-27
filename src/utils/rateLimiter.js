const { RateLimiterMemory } = require('rate-limiter-flexible');

// Configure rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 100, // Maximum 100 requests
  duration: 60, // Per 60 seconds
});

module.exports = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ error: 'Too many requests. Please try again later.' }));
};
