const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const membersData = require('../members.json');


// send members
router.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST request only for security
router.post('/init-data', async (req, res) => {
  try {
    await Member.deleteMany({});
    await Member.insertMany(membersData.members);
    res.json({ message: 'Sample data populated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 