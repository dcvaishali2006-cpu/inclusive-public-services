const mongoose = require('mongoose');

// A schema describes what one service looks like
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  address: String,
  phone: String,
  description: String,
  wheelchairAccessible: { type: Boolean, default: false },
  isFree: { type: Boolean, default: true },
  eligibility: { type: [String], default: ['Everyone'] },
  languages: { type: [String], default: ['English'] },
  lastVerified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);
