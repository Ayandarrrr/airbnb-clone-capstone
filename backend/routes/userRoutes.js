// backend/routes/userRoutes.js
// Auth routes: login, register, and profile.
const express = require("express");
const router = express.Router();
const { loginUser, registerUser, getMe } = require("../controllers/userController");
const { protect } = require("../middleware/auth");

// POST /api/users/login    — authenticate and receive a JWT
router.post("/login", loginUser);

// POST /api/users/register — create a new user account
router.post("/register", registerUser);

// GET  /api/users/me       — get current user profile (protected)
router.get("/me", protect, getMe);

module.exports = router;
