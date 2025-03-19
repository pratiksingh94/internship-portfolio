const jwt = require('jsonwebtoken');
const Member = require('../models/Member');

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'no auth token' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const member = await Member.findById(decoded.id);
    console.log(member);
    if (!member) {
      return res.status(401).json({ error: 'member not found' });
    }

    req.token = token;
    req.member = member;
    next();
  } catch (error) {
    res.status(401).json({ error: 'invalid token' });
  }
};


const isAdmin = (req, res, next) => {
  if (req.member.isAdmin) {
    return next();
  }
  res.status(403).json({ error: 'access denied' });
};

const isOwnerOrAdmin = (req, res, next) => {
  if (req.member._id.toString() === req.params.id || req.member.isAdmin) {
    return next();
  }
  res.status(403).json({ error: 'access denied' });
};


module.exports = { auth, isAdmin, isOwnerOrAdmin }; 