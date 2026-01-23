const Scheme = require("../model/Scheme");

// POST a new scheme (Admin/Backend action)
exports.createScheme = async (req, res) => {
  try {
    const { title, description, scholarshipAmount, deadlineDate, helplineNumber } = req.body;

    const newScheme = new Scheme({
      title,
      description,
      scholarshipAmount,
      deadlineDate,
      helplineNumber
    });

    await newScheme.save();
    res.status(201).json({ message: "Scheme posted successfully!", scheme: newScheme });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all schemes (Publicly visible to users)
exports.getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};