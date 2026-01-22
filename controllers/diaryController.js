const Diary = require("../model/Diary");

// SAVE A PLAN TO DIARY
exports.savePlanToDiary = async (req, res) => {
  try {
    const { title, activities } = req.body;

    const newDiaryEntry = new Diary({
      userId: req.user.id, // Derived from JWT via auth middleware
      title,
      activities
    });

    await newDiaryEntry.save();
    res.status(201).json({ message: "Plan saved to your diary!", diary: newDiaryEntry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PLANS FOR THE LOGGED-IN USER
exports.getUserDiary = async (req, res) => {
  try {
    const plans = await Diary.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};