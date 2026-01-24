require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbconnection");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const diaryRoutes = require("./routes/diaryRoutes");
const postRoutes = require("./routes/postRoutes"); 
const schemeRoutes = require("./routes/schemeRoutes");
const savedPostRoutes = require("./routes/savedPostRoutes");

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve the uploads folder statically so images are accessible via URL
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/posts", postRoutes); 
app.use("/api/schemes", schemeRoutes);
app.use("/api/saved-posts", savedPostRoutes);

// Test Protected Route
const auth = require("./middleware/authMiddleware");
app.get("/api/protected", auth, (req, res) => {
    res.json({ message: "You have access!", userId: req.user.id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));