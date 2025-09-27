const mongoose = require('mongoose');

/**
 * Connects to the MongoDB database using Mongoose.
 */
exports.connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in the environment variables.');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connection successful.');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
};