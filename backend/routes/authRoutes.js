// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');  // Ensure this is correct

// POST request for user registration
router.post('/register', authController.register);  // Ensure authController.register is defined

// POST request for user login (if you have this)
router.post('/login', authController.login);  // Ensure authController.login is defined

module.exports = router;
