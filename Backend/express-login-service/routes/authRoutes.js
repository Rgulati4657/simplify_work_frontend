const express = require('express');
const { login } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);

// Example protected route
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});
module.exports = router;
