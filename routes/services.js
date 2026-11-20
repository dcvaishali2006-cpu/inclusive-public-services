const express = require('express');
const Service = require('../models/Service');
const Report = require('../models/Report');
const checkAdmin = require('../checkAdmin');

const router = express.Router();

// Makes user text safe to use inside a search pattern
function escapeText(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// GET /api/services  -> list services, with search and filters
router.get('/', async (req, res) => {
  try {
    const q = req.query;
    const filter = {}; // we add one rule for each filter the user used

    // Search word: look in name, description and category (ignore capital letters)
    if (q.search) {
      const word = new RegExp(escapeText(q.search), 'i');
      filter.$or = [{ name: word }, { description: word }, { category: word }];
    }
    if (q.category) filter.category = q.category;
    if (q.city) filter.city = new RegExp(escapeText(q.city), 'i');
    if (q.wheelchair === 'true') filter.wheelchairAccessible = true;
    if (q.free === 'true') filter.isFree = true;
    // Show services made for this group OR for everyone
    if (q.eligibility) filter.eligibility = { $in: [q.eligibility, 'Everyone'] };
    if (q.language) filter.languages = q.language;

    const services = await Service.find(filter).sort({ name: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/services/:id  -> one service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /api/services  -> add a service (admin only)
router.post('/', checkAdmin, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/services/:id/verify  -> set "last verified" to today (admin only)
router.put('/:id/verify', checkAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id, { lastVerified: new Date() }, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/services/:id  -> edit a service (admin only)
router.put('/:id', checkAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/services/:id  -> delete a service and its reports (admin only)
router.delete('/:id', checkAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    await Report.deleteMany({ serviceId: req.params.id });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
