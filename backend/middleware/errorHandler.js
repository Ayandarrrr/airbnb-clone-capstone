// backend/middleware/errorHandler.js
// Centralised Express error handler.
// Catches errors passed via next(err) from any route or middleware.

/**
 * Global error-handling middleware.
 * Must be registered AFTER all routes in server.js.
 * Signature requires all 4 parameters even if _next is unused.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} —`, err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(" ") });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ message: `${field} already exists.` });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token." });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired. Please log in again." });
  }

  // Default
  const status = err.statusCode || err.status || 500;
  res.status(status).json({ message: err.message || "Internal server error." });
};

module.exports = errorHandler;
