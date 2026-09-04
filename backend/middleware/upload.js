// backend/middleware/upload.js
// Multer configuration for handling image file uploads.
// Images are stored in the /uploads directory on the server.
// Only image files (jpeg, png, gif, webp) are accepted.
// Max file size: 5 MB per image.
const multer = require("multer");
const path   = require("path");
const fs     = require("fs");

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ── Storage engine ────────────────────────────────────────
// Files are saved to /uploads with a timestamp-prefixed filename
// to avoid naming collisions.
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext    = path.extname(file.originalname).toLowerCase();
    cb(null, `upload-${unique}${ext}`);
  },
});

// ── File filter ───────────────────────────────────────────
// Reject anything that is not an image MIME type.
const fileFilter = (_req, file, cb) => {
  const allowed = /^image\/(jpeg|jpg|png|gif|webp)$/;
  if (allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, png, gif, webp) are allowed."), false);
  }
};

// ── Multer instance ───────────────────────────────────────
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files:    10,               // max 10 images per request
  },
});

module.exports = upload;
