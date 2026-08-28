// backend/models/Reservation.js
// Mongoose schema for guest reservations.
// Matches the recommended reservation data structure from the project brief.
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    accommodation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
      required: [true, "Accommodation reference is required."],
    },
    // The guest who made the reservation
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Dates
    checkIn: {
      type: Date,
      required: [true, "Check-in date is required."],
    },
    checkOut: {
      type: Date,
      required: [true, "Check-out date is required."],
      validate: {
        validator: function (v) {
          return v > this.checkIn;
        },
        message: "Check-out date must be after check-in date.",
      },
    },
    guests: {
      type: Number,
      required: [true, "Guest count is required."],
      min: [1, "At least 1 guest is required."],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required."],
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
