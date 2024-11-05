// routes/userRoutes.js
const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Define your routes
router.post('/register', registerUser);
router.post('/login', authUser);

// Example protected route
router.get('/profile', protect, async (req, res) => {
    res.json(req.user); // Return the user info
  });

module.exports = router;
