const express = require("express");
const router = express.Router();
const { createLog, getAllLogs } = require("../controllers/logsController");
const auth = require("../middleware/authMiddleware");

// Private: User must be logged in to report a disease
router.post("/report", auth, createLog);

// Public: Anyone can see the disease detection logs
router.get("/all", getAllLogs);

module.exports = router;