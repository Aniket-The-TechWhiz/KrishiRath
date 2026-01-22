const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

// Auth Routes
router.post("/signup", registerUser);
router.post("/signin", loginUser);

// Profile Routes (Protected)
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);

module.exports = router;