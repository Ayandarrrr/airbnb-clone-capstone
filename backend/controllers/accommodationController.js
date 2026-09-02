// backend/controllers/accommodationController.js
// CRUD operations for property listings.
// Create / Read / Update / Delete — all with proper validation and error handling.
const Accommodation = require("../models/Accommodation");

// ── GET /api/accommodations ───────────────────────────────
/**
 * Return all accommodation listings.
 * Optionally filter by ?location=New+York
 */
const getAllAccommodations = async (req, res) => {
  try {
    const filter = {};
    if (req.query.location) {
      // Case-insensitive partial match on location
      filter.location = { $regex: req.query.location, $options: "i" };
    }

    const accommodations = await Accommodation.find(filter).sort({ createdAt: -1 });
    res.status(200).json(accommodations);
  } catch (err) {
    console.error("getAllAccommodations error:", err);
    res.status(500).json({ message: "Failed to fetch listings." });
  }
};

// ── GET /api/accommodations/:id ───────────────────────────
/** Return a single listing by ID. */
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: "Listing not found." });
    }
    res.status(200).json(accommodation);
  } catch (err) {
    // Invalid ObjectId format
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid listing ID." });
    }
    console.error("getAccommodationById error:", err);
    res.status(500).json({ message: "Failed to fetch listing." });
  }
};

// ── POST /api/accommodations ──────────────────────────────
/**
 * Create a new property listing.
 * Protected — requires a valid JWT.
 */
const createAccommodation = async (req, res) => {
  try {
    const data = { ...req.body };

    // Attach the authenticated user as host
    if (req.user) {
      data.host_id = req.user.id;
      if (!data.host) data.host = req.user.username;
    }

    const accommodation = await Accommodation.create(data);
    res.status(201).json(accommodation);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(" ") });
    }
    console.error("createAccommodation error:", err);
    res.status(500).json({ message: "Failed to create listing." });
  }
};

// ── PUT /api/accommodations/:id ───────────────────────────
/**
 * Update an existing listing.
 * Protected — only the host or admin may update.
 */
const updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: "Listing not found." });
    }

    // Ownership check: only the creating host or an admin may edit
    const isOwner = String(accommodation.host_id) === String(req.user?.id);
    const isAdmin = req.user?.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorised to update this listing." });
    }

    const updated = await Accommodation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(" ") });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid listing ID." });
    }
    console.error("updateAccommodation error:", err);
    res.status(500).json({ message: "Failed to update listing." });
  }
};

// ── DELETE /api/accommodations/:id ───────────────────────
/**
 * Delete a listing permanently.
 * Protected — only the host or admin may delete.
 */
const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: "Listing not found." });
    }

    const isOwner = String(accommodation.host_id) === String(req.user?.id);
    const isAdmin = req.user?.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorised to delete this listing." });
    }

    await accommodation.deleteOne();
    res.status(200).json({ message: "Listing deleted successfully." });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid listing ID." });
    }
    console.error("deleteAccommodation error:", err);
    res.status(500).json({ message: "Failed to delete listing." });
  }
};

module.exports = {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
};