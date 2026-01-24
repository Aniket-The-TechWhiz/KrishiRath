const SavedPost = require("../model/SavedPost");

// SAVE OR UNSAVE A POST (Toggle)
exports.toggleSavePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    const existingSave = await SavedPost.findOne({ userId, postId });

    if (existingSave) {
      await SavedPost.deleteOne({ _id: existingSave._id });
      return res.json({ message: "Post removed from saved list" });
    }

    const newSave = new SavedPost({ userId, postId });
    await newSave.save();
    res.status(201).json({ message: "Post saved successfully!", savedPost: newSave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL SAVED POSTS FOR USER
exports.getSavedPosts = async (req, res) => {
  try {
    // .populate("postId") pulls the actual image and description from the Post collection
    const saved = await SavedPost.find({ userId: req.user.id })
      .populate({
        path: "postId",
        populate: { path: "userId", select: "username" } // Shows who originally created the post
      })
      .sort({ savedAt: -1 });

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};