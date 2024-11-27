const express = require('express');
const { shortenUrl, redirectUrl, getStats } = require('../controllers/urlController');

const router = express.Router();

// POST /shorten: Shorten a URL
router.post('/shorten', shortenUrl);

// GET /:shortId: Redirect to the original URL
router.get('/:shortId', redirectUrl);

// GET /stats/:shortId: Get stats for a specific short URL
router.get('/stats/:shortId', getStats);

module.exports = router;
