const express = require("express");
const router = express.Router();
const { toggleSavePost, getSavedPosts } = require("../controllers/savedPostController");
const auth = require("../middleware/authMiddleware");

router.post("/toggle", auth, toggleSavePost);
router.get("/my-saved", auth, getSavedPosts);

module.exports = router;    