// backend/routes/reservationRoutes.js
// Reservation management routes.
// Note: /host and /user must be declared BEFORE /:id to avoid route conflicts.
const express = require("express");
const router = express.Router();
const {
  createReservation,
  getReservationsByHost,
  getReservationsByUser,
  deleteReservation,
} = require("../controllers/reservationController");
const { protect } = require("../middleware/auth");

// POST   /api/reservations          — create a reservation (auth optional — guest or anonymous)
router.post("/", protect, createReservation);

// GET    /api/reservations/host     — reservations for host's properties (protected)
router.get("/host", protect, getReservationsByHost);

// GET    /api/reservations/user     — reservations made by current user (protected)
router.get("/user", protect, getReservationsByUser);

// DELETE /api/reservations/:id     — cancel a reservation (protected)
router.delete("/:id", protect, deleteReservation);

module.exports = router;
