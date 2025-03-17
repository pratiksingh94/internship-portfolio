const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  profilePictureUrl: {
    type: String,
    required: true
  },
  linkedinUrl: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const Members = mongoose.model('Member', memberSchema);

module.exports = Members; 