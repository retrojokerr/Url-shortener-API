import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);

// Default export
export default Url;
