// models/ContactSchema.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',
    ],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [10, 'Message must be at least 10 characters'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
