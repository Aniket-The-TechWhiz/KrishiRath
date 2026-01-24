require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbconnection");
const fs = require("fs");


// Route Imports
const authRoutes = require("./routes/authRoutes");
const diaryRoutes = require("./routes/diaryRoutes");
const postRoutes = require("./routes/postRoutes"); 
const schemeRoutes = require("./routes/schemeRoutes");
const savedPostRoutes = require("./routes/savedPostRoutes");
const logsRoutes = require("./routes/logsRoutes");

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// Serve uploads with proper headers (VIDEO SAFE)
// ===============================
app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  const mimeType = filePath.endsWith(".mp4")
    ? "video/mp4"
    : filePath.endsWith(".mov")
    ? "video/quicktime"
    : "application/octet-stream";

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": mimeType,
    });

    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": mimeType,
      "Accept-Ranges": "bytes",
    });

    fs.createReadStream(filePath).pipe(res);
  }
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/posts", postRoutes); 
app.use("/api/schemes", schemeRoutes);
app.use("/api/saved-posts", savedPostRoutes);
app.use("/api/logs", logsRoutes);

// Test Protected Route
const auth = require("./middleware/authMiddleware");
app.get("/api/protected", auth, (req, res) => {
    res.json({ message: "You have access!", userId: req.user.id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));