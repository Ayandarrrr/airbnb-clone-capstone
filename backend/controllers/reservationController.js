// backend/controllers/reservationController.js
// CRUD operations for reservations.
// Guests create reservations; hosts/admins can view and manage them.
const Reservation = require("../models/Reservation");
const Accommodation = require("../models/Accommodation");

// ── POST /api/reservations ────────────────────────────────
/**
 * Create a new reservation.
 * The user can be authenticated (saves their ID) or anonymous.
 */
const createReservation = async (req, res) => {
  try {
    const { accommodationId, checkIn, checkOut, guests, totalPrice } = req.body;

    if (!accommodationId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        message: "accommodationId, checkIn, checkOut, and guests are required.",
      });
    }

    // Verify the accommodation exists
    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found." });
    }

    // Validate guest count against listing maximum
    if (Number(guests) > accommodation.guests) {
      return res.status(400).json({
        message: `This listing accepts a maximum of ${accommodation.guests} guests.`,
      });
    }

    const reservation = await Reservation.create({
      accommodation: accommodationId,
      user:          req.user?.id || null,
      checkIn:       new Date(checkIn),
      checkOut:      new Date(checkOut),
      guests:        Number(guests),
      totalPrice:    Number(totalPrice) || 0,
    });

    // Populate accommodation details in the response
    await reservation.populate("accommodation", "title location price images");

    res.status(201).json(reservation);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(" ") });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid accommodation ID." });
    }
    console.error("createReservation error:", err);
    res.status(500).json({ message: "Failed to create reservation." });
  }
};

// ── GET /api/reservations/host ────────────────────────────
/**
 * Return all reservations for accommodations owned by the logged-in host.
 * Admins see all reservations.
 */
const getReservationsByHost = async (req, res) => {
  try {
    let reservations;

    if (req.user.role === "admin") {
      // Admin: return everything
      reservations = await Reservation.find()
        .populate("accommodation", "title location price images")
        .populate("user", "username email")
        .sort({ createdAt: -1 });
    } else {
      // Host: find only their accommodations, then filter reservations
      const hostAccommodations = await Accommodation.find(
        { host_id: req.user.id },
        "_id"
      );
      const hostIds = hostAccommodations.map((a) => a._id);

      reservations = await Reservation.find({ accommodation: { $in: hostIds } })
        .populate("accommodation", "title location price images")
        .populate("user", "username email")
        .sort({ createdAt: -1 });
    }

    res.status(200).json(reservations);
  } catch (err) {
    console.error("getReservationsByHost error:", err);
    res.status(500).json({ message: "Failed to fetch reservations." });
  }
};

// ── GET /api/reservations/user ────────────────────────────
/**
 * Return all reservations made by the currently logged-in user.
 */
const getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id })
      .populate("accommodation", "title location price images")
      .sort({ createdAt: -1 });

    res.status(200).json(reservations);
  } catch (err) {
    console.error("getReservationsByUser error:", err);
    res.status(500).json({ message: "Failed to fetch reservations." });
  }
};

// ── DELETE /api/reservations/:id ─────────────────────────
/**
 * Cancel/delete a reservation.
 * Only the guest who made it or an admin may delete.
 */
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    const isOwner = String(reservation.user) === String(req.user.id);
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorised to cancel this reservation." });
    }

    await reservation.deleteOne();
    res.status(200).json({ message: "Reservation cancelled successfully." });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid reservation ID." });
    }
    console.error("deleteReservation error:", err);
    res.status(500).json({ message: "Failed to cancel reservation." });
  }
};

module.exports = {
  createReservation,
  getReservationsByHost,
  getReservationsByUser,
  deleteReservation,
};
