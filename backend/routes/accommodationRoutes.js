// backend/routes/accommodationRoutes.js
// Accommodation CRUD routes.
// GET (list + single) are public; Create/Update/Delete require authentication.
const express = require("express");
const router = express.Router();
const {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  searchAccommodations,
} = require("../controllers/accommodationController");
const { protect } = require("../middleware/auth");

// GET    /api/accommodations        — list all (public, supports ?location= filter)
router.get("/", getAllAccommodations);

// GET    /api/accommodations/search — full-text search (public)
router.get("/search", searchAccommodations);

// GET    /api/accommodations/:id    — single listing (public)
router.get("/:id", getAccommodationById);

// POST   /api/accommodations        — create listing (protected)
router.post("/", protect, createAccommodation);

// PUT    /api/accommodations/:id    — update listing (protected)
router.put("/:id", protect, updateAccommodation);

// DELETE /api/accommodations/:id   — delete listing (protected)
router.delete("/:id", protect, deleteAccommodation);

module.exports = router;
