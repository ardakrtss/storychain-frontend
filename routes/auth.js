const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { nickname, password } = req.body;

    // Validation
    if (!nickname || nickname.trim().length < 2) {
      return res.status(400).json({ error: 'Rumuz en az 2 karakter olmalıdır' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır' });
    }

    // Case insensitive nickname check
    const normalizedNickname = nickname.trim().toLowerCase();
    
    // Check if user already exists (case insensitive)
    const existingUser = await User.findOne({ 
      nickname: { $regex: new RegExp(`^${normalizedNickname}$`, 'i') }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Bu kullanıcı adı zaten kullanılıyor' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      nickname: normalizedNickname, // Store as lowercase
      password: hashedPassword,
      storiesWritten: 0,
      totalLikes: 0,
      role: 'user',
      isActive: true,
      createdAt: new Date()
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        nickname: user.nickname,
        stories_written: user.storiesWritten,
        total_likes: user.totalLikes,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Kayıt olurken bir hata oluştu' });
  }
});

// Login endpoint (with password)
router.post('/login', async (req, res) => {
  try {
    const { nickname, password } = req.body;

    if (!nickname || nickname.trim().length < 2) {
      return res.status(400).json({ error: 'Rumuz en az 2 karakter olmalıdır' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Şifre gereklidir' });
    }

    // Case insensitive nickname search
    const normalizedNickname = nickname.trim().toLowerCase();
    const user = await User.findOne({ 
      nickname: { $regex: new RegExp(`^${normalizedNickname}$`, 'i') }
    });

    if (!user) {
      return res.status(400).json({ error: 'Kullanıcı adı veya şifre hatalı' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({ error: 'Hesabınız pasif durumda' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Kullanıcı adı veya şifre hatalı' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        nickname: user.nickname,
        stories_written: user.storiesWritten,
        total_likes: user.totalLikes,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Giriş yapılırken bir hata oluştu' });
  }
});

// Legacy nickname-based login (no password required) - for backward compatibility
router.post('/login-legacy', async (req, res) => {
  try {
    const { nickname } = req.body;

    if (!nickname || nickname.trim().length < 2) {
      return res.status(400).json({ error: 'Rumuz en az 2 karakter olmalıdır' });
    }

    // Case insensitive nickname search
    const normalizedNickname = nickname.trim().toLowerCase();
    let user = await User.findOne({ 
      nickname: { $regex: new RegExp(`^${normalizedNickname}$`, 'i') }
    });
    
    if (!user) {
      // Create new user with nickname (legacy behavior)
      user = new User({
        nickname: normalizedNickname,
        storiesWritten: 0,
        totalLikes: 0,
        role: 'user',
        isActive: true,
        createdAt: new Date()
      });
      await user.save();
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({ error: 'Hesabınız pasif durumda' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        nickname: user.nickname,
        stories_written: user.storiesWritten,
        total_likes: user.totalLikes,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Legacy login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create admin user endpoint
router.post('/create-admin', async (req, res) => {
  try {
    const { nickname, password } = req.body;

    // Validation
    if (!nickname || nickname.trim().length < 2) {
      return res.status(400).json({ error: 'Rumuz en az 2 karakter olmalıdır' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır' });
    }

    // Case insensitive nickname check
    const normalizedNickname = nickname.trim().toLowerCase();
    
    // Check if user already exists (case insensitive)
    const existingUser = await User.findOne({ 
      nickname: { $regex: new RegExp(`^${normalizedNickname}$`, 'i') }
    });

    if (existingUser) {
      // If user exists, make them admin
      existingUser.role = 'admin';
      await existingUser.save();
      
      return res.json({
        success: true,
        message: 'Kullanıcı admin yapıldı',
        user: {
          id: existingUser._id,
          nickname: existingUser.nickname,
          role: existingUser.role
        }
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new admin user
    const user = new User({
      nickname: normalizedNickname,
      password: hashedPassword,
      storiesWritten: 0,
      totalLikes: 0,
      role: 'admin',
      isActive: true,
      createdAt: new Date()
    });

    await user.save();

    res.json({
      success: true,
      message: 'Admin kullanıcısı oluşturuldu',
      user: {
        id: user._id,
        nickname: user.nickname,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Admin kullanıcısı oluştururken bir hata oluştu' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      id: user._id,
      nickname: user.nickname,
      stories_written: user.storiesWritten,
      total_likes: user.totalLikes,
      role: user.role
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
