const express = require("express");
const router = express.Router();
const { 
  createPost, 
  getAllPosts, 
  likePost, 
  addComment 
} = require("../controllers/postController");

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Create Post: Requires Auth and File Upload
router.post("/create", auth, upload.single("media"), createPost);

// Get Feed: Publicly accessible
router.get("/feed", getAllPosts);

// Like/Unlike: Requires Auth
router.put("/like/:id", auth, likePost);

// Comment: Requires Auth
router.post("/comment/:id", auth, addComment);

module.exports = router;