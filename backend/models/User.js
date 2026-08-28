// backend/models/User.js
// Mongoose schema for platform users.
// Passwords are hashed with bcryptjs before saving.
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
      minlength: [2, "Username must be at least 2 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters."],
      // Never return the password field in query results by default
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "host", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// ── Pre-save hook: hash password before storing ────────────
userSchema.pre("save", async function (next) {
  // Only hash if the password field was modified
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Instance method: compare a plain-text candidate against the stored hash.
 * @param {string} candidate - Plain-text password from the login form.
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);
