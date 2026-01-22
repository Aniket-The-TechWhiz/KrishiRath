const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  // Profile Fields
  username: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  primaryLanguage: { type: String, default: "English" },
  farmSize: { type: String, default: "" }, // e.g., "5 Acres"
  experience: { type: String, default: "" }, // e.g., "10 Years"
  cityVillage: { type: String, default: "" },
  memberSince: { type: Date, default: Date.now } // Set by system
});

module.exports = mongoose.model("User", userSchema);