// backend/middleware/requestLogger.js
// Simple request logger — logs method, path, status, and response time.
// Only active in development mode.
const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV === "production") return next();

  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    const colour =
      res.statusCode >= 500 ? "\x1b[31m" :  // red
      res.statusCode >= 400 ? "\x1b[33m" :  // yellow
      res.statusCode >= 300 ? "\x1b[36m" :  // cyan
      "\x1b[32m";                            // green
    console.log(
      `${colour}${req.method}\x1b[0m ${req.path} → ${res.statusCode} (${ms}ms)`
    );
  });
  next();
};

module.exports = requestLogger;
