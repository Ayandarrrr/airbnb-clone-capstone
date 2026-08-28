// backend/middleware/auth.js
// JWT authentication middleware.
// Attach to any route that requires a logged-in user.
// Populates req.user with the decoded token payload on success.
const jwt = require("jsonwebtoken");

/**
 * Verifies the Bearer token in the Authorization header.
 * Sets req.user = { id, username, role } on success.
 * Returns 401 if the token is missing or invalid.
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorised. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded payload so downstream handlers can use it
    req.user = {
      id:       decoded.id,
      username: decoded.username,
      role:     decoded.role,
    };
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Token has expired. Please log in again."
        : "Not authorised. Invalid token.";
    return res.status(401).json({ message });
  }
};

/**
 * Role guard — use after protect().
 * Usage: router.delete("/route", protect, requireRole("admin"), handler)
 * @param {...string} roles - Allowed roles.
 */
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({
      message: `Access denied. Required role: ${roles.join(" or ")}.`,
    });
  }
  next();
};

module.exports = { protect, requireRole };
