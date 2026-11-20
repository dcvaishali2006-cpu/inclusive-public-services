const mongoose = require('mongoose');

// A report is a complaint: "this service's info is wrong"
const reportSchema = new mongoose.Schema({
  // Link to the service (its _id)
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  message: { type: String, required: true, maxlength: 500 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
