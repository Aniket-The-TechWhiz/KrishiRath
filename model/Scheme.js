const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  eligibility: {
    type: [String], 
    required: true
  },
  benefits: {
    type: [String], 
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  helplineNumber: {
    type: String,
    required: false 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Scheme", schemeSchema);