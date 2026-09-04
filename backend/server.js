// backend/server.js
// Entry point for the Express API server.
// Connects to MongoDB, registers middleware and routes, starts listening.
require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const mongoose = require("mongoose");
const path     = require("path");

const errorHandler    = require("./middleware/errorHandler");
const requestLogger   = require("./middleware/requestLogger");

// ── Route imports ─────────────────────────────────────────
const userRoutes          = require("./routes/userRoutes");
const accommodationRoutes = require("./routes/accommodationRoutes");
const reservationRoutes   = require("./routes/reservationRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Global middleware ─────────────────────────────────────

// CORS — allow the React dev server (port 3000) and any deployed origin
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      const allowed = [
        "http://localhost:3000",
        process.env.CLIENT_URL,
      ].filter(Boolean);

      // Also allow any onrender.com subdomain for Render deployments
      if (
        allowed.includes(origin) ||
        origin.endsWith(".onrender.com") ||
        origin.endsWith(".netlify.app") ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error(`CORS: origin ${origin} not allowed`), false);
    },
    credentials: true,
  })
);

// Parse incoming JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger (dev only)
app.use(requestLogger);

// Serve uploaded images statically from /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Routes ────────────────────────────────────────────────
app.use("/api/users",          userRoutes);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/reservations",   reservationRoutes);

// Health-check endpoint — useful for deployment platforms
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── 404 handler (unmatched routes) ───────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// ── Global error handler (uses centralised errorHandler) ──
app.use(errorHandler);

// ── MongoDB connection + server start ─────────────────────
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 8 no longer needs useNewUrlParser / useUnifiedTopology
    });
    console.log(`✓ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("✗ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`  Environment : ${process.env.NODE_ENV || "development"}`);
  });
});
