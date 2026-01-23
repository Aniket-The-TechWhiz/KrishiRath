const express = require("express");
const router = express.Router();
const { createScheme, getAllSchemes } = require("../controllers/schemeController");

// Public Route: Any user can see the schemes
router.get("/all", getAllSchemes);

// Admin/Backend Route: To post new schemes
// (You can add 'auth' middleware here if you want only logged-in admins to post)
router.post("/create", createScheme);

module.exports = router;