// backend/controllers/userController.js
// Handles user authentication: login and (optionally) register.
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Sign a JWT for a given user document.
 * @param {Object} user - Mongoose User document.
 * @returns {string} Signed JWT string.
 */
const signToken = (user) =>
  jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

// ── POST /api/users/login ─────────────────────────────────
/**
 * Authenticate a user with email + password.
 * Returns a JWT on success.
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic input check
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Fetch user — password is excluded by default, re-select it here
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      // Use a generic message to avoid leaking which field is wrong
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = signToken(user);

    res.status(200).json({
      token,
      user: {
        id:       user._id,
        username: user.username,
        email:    user.email,
        role:     user.role,
      },
    });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};

// ── POST /api/users/register ──────────────────────────────
/**
 * Register a new user account.
 * Returns a JWT so the user is immediately logged in.
 */
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required." });
    }

    // Check for existing account
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "An account with that email already exists." });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || "user",
    });

    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        id:       user._id,
        username: user.username,
        email:    user.email,
        role:     user.role,
      },
    });
  } catch (err) {
    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(" ") });
    }
    console.error("registerUser error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// ── GET /api/users/me ─────────────────────────────────────
/** Return the currently authenticated user's profile. */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json({
      id:       user._id,
      username: user.username,
      email:    user.email,
      role:     user.role,
    });
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { loginUser, registerUser, getMe };
