// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ensure this is the correct path

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Input validation (can be more complex)
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please fill out all required fields.' });
    }

    // Check if the email is already taken
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Include the user's role in the response
    res.status(200).json({
      message: 'Login successful',
      user,
      role: user.role // Send the role (admin or user)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

