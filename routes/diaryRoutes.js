const express = require("express");
const router = express.Router();
const { savePlanToDiary, getUserDiary } = require("../controllers/diaryController");
const auth = require("../middleware/authMiddleware");

// All diary routes require authentication
router.post("/save", auth, savePlanToDiary);
router.get("/my-plans", auth, getUserDiary);

module.exports = router;