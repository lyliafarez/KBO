const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate tokens (access and refresh)
const generateTokens = (user) => {
  const authToken = jwt.sign(
    { id: user._id }, 
    process.env.JWT_SECRET || '0c60e8729837bf39e01f16b24553e026f8655a3ba03b11be6b5cc2b8376ac11d3cb3f2d6c5f4f1ab09d5cbb830fdfd8f495dd6ffde9ad5b8a9c3fd3d12f70341',  
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { id: user._id }, 
    process.env.REFRESH_SECRET || '91b42e81d07f81a0cc573f31cbfd4f20ccff72c06cdd9b5df6163b4c543cdfd0a4f42c1ab46fd51a86ad33fb412dcde178bcff48cf3d5d2e4d29053d87dd44f1',  // Use REFRESH_SECRET
    { expiresIn: '7d' }
  );
  
  return { authToken, refreshToken };
};

// Register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate tokens for the user
    const tokens = generateTokens(user);
    
    // Return user profile and tokens
    res.status(201).json({ user: user.getPublicProfile(), ...tokens });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    
    // Check if user exists and password matches
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate tokens for the user
    const tokens = generateTokens(user);
    
    // Return user profile and tokens
    res.status(200).json({ user: user.getPublicProfile(), ...tokens });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  
  // Check if the refresh token is provided
  if (!refreshToken) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET || 'your_fallback_refresh_secret');
    
    // Find the user by decoded ID
    const user = await User.findById(decoded.id);
    
    // If no user is found, return error
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Generate new tokens
    const tokens = generateTokens(user);
    
    // Return the new tokens
    res.status(200).json(tokens);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
