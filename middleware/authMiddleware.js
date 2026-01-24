const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // 1️⃣ Read authorization header (case-insensitive)
    const authHeader =
      req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      console.log("❌ No Authorization header");
      return res.status(401).json({
        error: "Access denied. Authorization header missing.",
      });
    }

    // 2️⃣ Expect: "Bearer <token>"
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      console.log("❌ Invalid auth header format:", authHeader);
      return res.status(401).json({
        error: "Invalid authorization format. Use Bearer token.",
      });
    }

    const token = parts[1];

    if (!token) {
      console.log("❌ Token missing after Bearer");
      return res.status(401).json({
        error: "Access denied. Token missing.",
      });
    }

    // 3️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach user info
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);

    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

module.exports = auth;
