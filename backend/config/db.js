const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // The following options are deprecated in the latest MongoDB Node.js driver
            // They can be removed, as they are now defaults
            // useNewUrlParser: true, 
            // useUnifiedTopology: true,
        });
        console.log('MongoDB connected:', process.env.MONGO_URI);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
