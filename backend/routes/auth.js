const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const {
  auth,
  isAdmin
} = require('../middleware/auth');

router.post('/create-member', auth, isAdmin, async (req, res) => {
  const exists = await Member.findOne({ username: req.body.username });
  if (exists) return res.status(400).json({ error: 'username already exists' });
  try {
    const member = new Member(req.body);
    await member.save();

    const token = jwt.sign(
      { id: member._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ member, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const member = await Member.findOne({ username });
    if (!member) return res.status(401).json({ error: 'i8nvalid credentials' });

    const isMatch = await member.comparePassword(password);
    if (!isMatch) return res.status(401).json({
      error: 'invalid credentials'
    });

    const token = jwt.sign(
      { id: member._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ member, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
    console.log(error)
  }
});


module.exports = router; 