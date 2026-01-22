const express = require("express");
const router = express.Router();
// Add likePost and addComment to this list
const { createPost, getAllPosts, likePost, addComment } = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Routes
router.post("/create", auth, upload.single("media"), createPost);
router.get("/feed", getAllPosts);

// These were causing the error because they weren't imported above
router.put("/like/:id", auth, likePost);
router.post("/comment/:id", auth, addComment);

module.exports = router;