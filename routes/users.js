const express = require('express');
const User = require('../models/User');
const Story = require('../models/Story');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Get top writers
router.get('/top-writers', async (req, res) => {
  try {
    const topWriters = await User.find({ isActive: true })
      .select('nickname storiesWritten totalLikes')
      .sort({ storiesWritten: -1, totalLikes: -1 })
      .limit(10);
    
    res.json(topWriters);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const userStories = await Story.find({
      'segments.author': req.user.userId
    });

    const stats = {
      storiesWritten: user.storiesWritten,
      totalLikes: user.totalLikes,
      completedStories: userStories.filter(story => story.isCompleted).length,
      ongoingStories: userStories.filter(story => !story.isCompleted).length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get all users (admin only)
router.get('/admin/users', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Delete user (admin only)
router.delete('/admin/users/:userId', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { userId } = req.params;
    
    // Prevent admin from deleting themselves
    if (userId === req.user.userId) {
      return res.status(400).json({ error: 'Kendinizi silemezsiniz' });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    res.json({ message: 'Kullanıcı başarıyla silindi' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Toggle user status (admin only)
router.put('/admin/users/:userId/status', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { userId } = req.params;
    const { isActive } = req.body;

    // Prevent admin from deactivating themselves
    if (userId === req.user.userId) {
      return res.status(400).json({ error: 'Kendinizi pasif yapamazsınız' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    res.json({ message: `Kullanıcı ${isActive ? 'aktif' : 'pasif'} hale getirildi`, user });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Change user role (admin only)
router.put('/admin/users/:userId/role', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Geçersiz rol' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    res.json({ message: `Kullanıcı rolü ${role} olarak değiştirildi`, user });
  } catch (error) {
    console.error('Change user role error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check if nickname is available (case insensitive)
router.get('/check-nickname/:nickname', async (req, res) => {
  try {
    const { nickname } = req.params;
    const normalizedNickname = nickname.trim().toLowerCase();

    const existingUser = await User.findOne({ 
      nickname: { $regex: new RegExp(`^${normalizedNickname}$`, 'i') }
    });

    res.json({ 
      available: !existingUser,
      suggestions: existingUser ? generateNicknameSuggestions(normalizedNickname) : []
    });
  } catch (error) {
    console.error('Check nickname error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper function to generate nickname suggestions
function generateNicknameSuggestions(baseNickname) {
  const suggestions = [];
  
  // Add numbers
  for (let i = 1; i <= 5; i++) {
    suggestions.push(`${baseNickname}${i}`);
  }
  
  // Add common suffixes
  const suffixes = ['_', '.', 'x', 'pro', '2024', 'real', 'official', 'tr'];
  suffixes.forEach(suffix => {
    suggestions.push(`${baseNickname}${suffix}`);
  });
  
  // Add random combinations
  const randomWords = ['cool', 'awesome', 'super', 'mega', 'ultra', 'star', 'king', 'queen'];
  randomWords.forEach(word => {
    suggestions.push(`${baseNickname}_${word}`);
  });
  
  // Shuffle and take first 8
  return suggestions.sort(() => 0.5 - Math.random()).slice(0, 8);
}

module.exports = router;
