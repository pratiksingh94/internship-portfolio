const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const {
  auth,
  isAdmin,
  isOwnerOrAdmin
} = require('../middleware/auth');
const membersData = require('../members.json');

router.get('/members/:id?', async (req, res) => {
  try {
    if (req.params.id) {
      const member = await Member.findById(req.params.id, '-password');
      if (!member) {
        return res.status(404).json({ error: 'member not found' });
      }
      return res.json(member);
    }
    
    const members = await Member.find({}, '-password');
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.patch('/members/:id', auth, isOwnerOrAdmin, async (req, res) => {
  const allowedFields = ['name', 'title', 'bio', 'profilePictureUrl', 'linkedinUrl'];
  const updateFields = Object.keys(req.body);

  const isValid = updateFields.every(field => allowedFields.includes(field));
  
  if (!isValid) {
    return res.status(400).json({
      error: 'invalid fields'
    });
  }

  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'member not found' });
    }

    updateFields.forEach(field => {
      member[field] = req.body[field];
    });

    await member.save();
    res.json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/members/:id', auth, isAdmin, async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ error: 'member not found' });
    }
    res.json({ message: 'member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// POST request only for security
router.post('/init-data', async (req, res) => {
  try {
    await Member.deleteMany({});
    
    for (const memberData of membersData.members) {
      const member = new Member(memberData);
      await member.save();
    }
    
    res.json({ message: 'sample data populated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 