const { nanoid } = require('nanoid');
const Url = require('../models/Url');

// Shorten a URL
exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required.' });
  }

  try {
    const shortId = nanoid(8); // Generate a short unique ID
    const url = await Url.create({ originalUrl, shortId });
    res.status(201).json({ shortId, shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to shorten URL.' });
  }
};

// Redirect to the original URL
exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: 'Short URL not found.' });
    }

    url.clicks += 1; // Increment click count
    url.lastAccessed = new Date(); // Update last accessed time
    await url.save();

    res.redirect(url.originalUrl); // Redirect to the original URL
  } catch (err) {
    res.status(500).json({ error: 'Failed to redirect.' });
  }
};

// Get stats for a short URL
exports.getStats = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: 'Short URL not found.' });
    }

    res.json({
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve stats.' });
  }
};
