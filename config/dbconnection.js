const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // This MUST match the name in your .env file
    const uri = process.env.MONGO_URI; 

    if (!uri) {
      console.error("❌ MONGO_URI is undefined. Check your .env file.");
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;