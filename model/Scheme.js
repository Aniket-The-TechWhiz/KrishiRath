const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  scholarshipAmount: {
    type: String, // String to allow formats like "₹50,000" or "100% subsidy"
    required: true
  },
  deadlineDate: {
    type: Date,
    required: true
  },
  helplineNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Scheme", schemeSchema);