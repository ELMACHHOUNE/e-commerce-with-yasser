require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use('/api/users', require('./routes/userRoutes'));
app.get('/', (req, res) => { res.send('API is running...'); });

app.use(express.json()); // Middleware to parse JSON
app.use('/api/products', productRoutes);
// Connect Database
connectDB();

// Define Routes (we'll add these later)
// app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
