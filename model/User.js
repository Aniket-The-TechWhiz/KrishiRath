const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  // Profile Fields
  username: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  primaryLanguage: { type: String, default: "English" },
  farmSize: { type: String, default: "" }, 
  experience: { type: String, default: "" }, 
  cityVillage: { type: String, default: "" },
  // New Location Fields
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  memberSince: { type: Date, default: Date.now } 
});

module.exports = mongoose.model("User", userSchema);