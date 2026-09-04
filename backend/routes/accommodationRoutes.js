// backend/routes/accommodationRoutes.js
// Accommodation CRUD routes.
// GET (list + single) are public; Create/Update/Delete require authentication.
// Image upload endpoint is protected and accepts multipart/form-data.
const express = require("express");
const path    = require("path");
const router  = express.Router();
const {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
} = require("../controllers/accommodationController");
const { protect }  = require("../middleware/auth");
const upload       = require("../middleware/upload");

// ── Accommodation CRUD ────────────────────────────────────

// GET    /api/accommodations        — list all (public, supports ?location= filter)
router.get("/", getAllAccommodations);

// GET    /api/accommodations/:id    — single listing (public)
router.get("/:id", getAccommodationById);

// POST   /api/accommodations        — create listing (protected)
router.post("/", protect, createAccommodation);

// PUT    /api/accommodations/:id    — update listing (protected)
router.put("/:id", protect, updateAccommodation);

// DELETE /api/accommodations/:id   — delete listing (protected)
router.delete("/:id", protect, deleteAccommodation);

// ── Image Upload ──────────────────────────────────────────

/**
 * POST /api/accommodations/upload/images
 * Upload up to 10 images for a listing.
 * Returns an array of publicly accessible URLs for each uploaded file.
 * Protected — requires a valid JWT.
 *
 * Request:  multipart/form-data, field name "images"
 * Response: { urls: ["/uploads/upload-xxx.jpg", ...] }
 */
router.post(
  "/upload/images",
  protect,
  upload.array("images", 10),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No image files were uploaded." });
    }

    // Build public URL paths for each uploaded file
    const urls = req.files.map(
      (f) => `/uploads/${path.basename(f.path)}`
    );

    res.status(200).json({
      message: `${urls.length} image(s) uploaded successfully.`,
      urls,
    });
  }
);

module.exports = router;
