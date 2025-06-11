const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../models/userModel');
require('dotenv').config();

async function login(req, res) {
  const { username, password } = req.body;
  console.log('Login attempt:', username, password); // 🔍 Log input


  try {
    const user = await findUserByUsername(username);
    if (!user || user.password !== password) {
         console.log('Password mismatch or user not found'); // 🔍 Log reason
      return res.json({ success: false, message: 'Invalid credentials' });
    }

   
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '1h' }
    ); 
     console.log('Token generated:', token); // 🔍 Log token

    return res.json({ success: true, message: 'Login successful',token, // send JWT token
      user: { id: user.id, username: user.username } });
  } catch (error) {
     console.error('Login error:', error); // 🔍 Log error
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
}

module.exports = { login };
