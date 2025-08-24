const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  password: {
    type: String,
    required: false, // Optional for legacy users
    minlength: 6
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  storiesWritten: {
    type: Number,
    default: 0
  },
  likedStories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  }],
  totalLikes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
