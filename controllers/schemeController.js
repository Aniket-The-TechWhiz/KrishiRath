const Scheme = require("../model/Scheme");

// POST a new scheme
exports.createScheme = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      provider, 
      category, 
      eligibility, 
      benefits, 
      deadline, 
      helplineNumber 
    } = req.body;

    const newScheme = new Scheme({
      name,
      description,
      provider,
      category,
      eligibility,
      benefits,
      deadline,
      helplineNumber
    });

    await newScheme.save();
    res.status(201).json({ message: "Scheme posted successfully!", scheme: newScheme });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all schemes
exports.getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};