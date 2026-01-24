const Logs = require("../model/Logs");

// POST: Save a new detection log
exports.createLog = async (req, res) => {
  try {
    const { diseaseName, latitude, longitude } = req.body;

    const newLog = new Logs({
      userId: req.user.id, // Taken from JWT auth
      diseaseName,
      latitude,
      longitude
    });

    await newLog.save();
    res.status(201).json({ message: "Detection log saved successfully", log: newLog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Fetch all logs (Publicly accessible)
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Logs.find()
      .populate("userId", "username") // Shows which user reported it
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};