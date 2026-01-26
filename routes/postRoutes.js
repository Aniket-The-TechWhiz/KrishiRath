const express = require("express");
const router = express.Router();

const {
    createPost,
    getAllPosts,
    likePost,
    addComment,
} = require("../controllers/postController");

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// CREATE POST (Auth + Media)
router.post(
    "/create",
    auth,
    upload.single("media"),
    createPost
);

// GET FEED (Public)
router.get("/feed", getAllPosts);

// LIKE / UNLIKE POST
router.put("/like/:id", auth, likePost);

// COMMENT ON POST
router.post("/comment/:id", auth, addComment);

module.exports = router;


