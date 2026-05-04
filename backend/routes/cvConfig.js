const express = require('express');
const router = express.Router();
const CVConfig = require('../models/CVConfig');
const { protect: auth } = require('../middleware/auth');

router.get('/', async (_req, res) => {
  try {
    let config = await CVConfig.findOne();
    if (!config) config = await CVConfig.create({});
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const { templateId, cvData } = req.body;
    let config = await CVConfig.findOne();
    if (!config) config = new CVConfig();
    if (templateId !== undefined) config.templateId = templateId;
    if (cvData !== undefined) config.cvData = cvData;
    config.markModified('cvData');
    await config.save();
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
