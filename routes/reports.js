const express = require('express');
const Report = require('../models/Report');
const Service = require('../models/Service');
const checkAdmin = require('../checkAdmin');

const router = express.Router();

// POST /api/reports  -> anyone can report wrong information
router.post('/', async (req, res) => {
  try {
    // Make sure the service really exists
    const exists = await Service.exists({ _id: req.body.serviceId });
    if (!exists) return res.status(404).json({ message: 'Service not found' });

    const report = await Report.create({
      serviceId: req.body.serviceId,
      message: req.body.message
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/reports  -> admin sees all reports (newest first)
router.get('/', checkAdmin, async (req, res) => {
  try {
    // populate() replaces serviceId with the service's name and city
    const reports = await Report.find()
      .populate('serviceId', 'name city')
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/reports/:id  -> admin approves or rejects
router.put('/:id', checkAdmin, async (req, res) => {
  try {
    const status = req.body.status;
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ message: 'Status must be approved or rejected' });
    }
    const report = await Report.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
