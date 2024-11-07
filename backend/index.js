// Importing necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import User model (create this in your models directory)
const User = require('./models/User'); // Ensure the path is correct

// Initialize dotenv to load environment variables from .env file
dotenv.config();

// Initialize the express app
const app = express();

// Middleware to handle JSON requests
app.use(express.json());

// CORS setup (Allowing requests from your frontend)
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Connect to MongoDB using the URI from your .env file
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Example route: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    // If no user is found
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },  // Payload (user ID and role)
      process.env.JWT_SECRET,             // JWT Secret from .env
      { expiresIn: '1h' }                // Token expiration
    );

    // Send response with the token
    res.status(200).json({
      message: 'Login successful',
      token: token, // Send the token in the response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
