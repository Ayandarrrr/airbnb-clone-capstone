// backend/models/Accommodation.js
// Mongoose schema for property listings.
// Matches the recommended data structure from the project brief.
const mongoose = require("mongoose");

const specificRatingsSchema = new mongoose.Schema(
  {
    cleanliness:   { type: Number, min: 0, max: 5, default: 0 },
    communication: { type: Number, min: 0, max: 5, default: 0 },
    checkIn:       { type: Number, min: 0, max: 5, default: 0 },
    accuracy:      { type: Number, min: 0, max: 5, default: 0 },
    location:      { type: Number, min: 0, max: 5, default: 0 },
    value:         { type: Number, min: 0, max: 5, default: 0 },
  },
  { _id: false }
);

const accommodationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Property type is required."],
      enum: [
        "Entire apartment", "Entire house", "Entire villa", "Entire loft",
        "Private room", "Shared room", "Cabin", "Cottage", "Studio",
      ],
    },
    bedrooms:  { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    guests:    { type: Number, required: true, min: 1 },
    price:     { type: Number, required: true, min: 0 },

    // Fees (all optional, default 0)
    weeklyDiscount: { type: Number, default: 0, min: 0, max: 100 },
    cleaningFee:    { type: Number, default: 0, min: 0 },
    serviceFee:     { type: Number, default: 0, min: 0 },
    occupancyTaxes: { type: Number, default: 0, min: 0 },

    amenities: { type: [String], default: [] },
    images:    { type: [String], default: [] },

    // Host reference
    host:    { type: String, trim: true },
    host_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Ratings
    rating:          { type: Number, default: 0, min: 0, max: 5 },
    reviews:         { type: Number, default: 0 },
    specificRatings: { type: specificRatingsSchema, default: () => ({}) },

    // Property features
    enhancedCleaning: { type: Boolean, default: false },
    selfCheckIn:      { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index for search functionality
accommodationSchema.index({ title: "text", location: "text", description: "text" });

module.exports = mongoose.model("Accommodation", accommodationSchema);

// Virtual: derived average rating label
accommodationSchema.virtual("ratingLabel").get(function () {
  if (this.rating >= 4.8) return "Exceptional";
  if (this.rating >= 4.5) return "Wonderful";
  if (this.rating >= 4.0) return "Very good";
  if (this.rating >= 3.5) return "Good";
  return "Okay";
});
