// backend/seed.js
// Seeds the database with:
//   - 2 test users  (admin + regular user, as recommended in the brief)
//   - 5 sample accommodation listings
//
// Usage: node seed.js
// Run once after setting up your .env and MongoDB connection.
require("dotenv").config();
const mongoose      = require("mongoose");
const User          = require("./models/User");
const Accommodation = require("./models/Accommodation");

// ── Seed data ─────────────────────────────────────────────

const users = [
  {
    username: "Admin User",
    email:    "admin@example.com",
    password: "admin123",
    role:     "admin",
  },
  {
    username: "Jane Doe",
    email:    "jane@example.com",
    password: "password321",
    role:     "host",
  },
  {
    username: "John Doe",
    email:    "john@example.com",
    password: "password123",
    role:     "user",
  },
];

const accommodations = [
  {
    title:           "Modern Apartment in New York",
    location:        "New York",
    description:     "Stay in the heart of New York City in this stunning modern apartment. Steps away from Central Park, world-class dining, and iconic landmarks.",
    type:            "Entire apartment",
    bedrooms:        2,
    bathrooms:       2,
    guests:          4,
    price:           320,
    weeklyDiscount:  10,
    cleaningFee:     50,
    serviceFee:      50,
    occupancyTaxes:  30,
    amenities:       ["Wifi", "Kitchen", "Free parking", "Air conditioning", "Washer"],
    images:          ["/images/new-york-apartment.jpg"],
    host:            "Johann",
    rating:          4.5,
    reviews:         320,
    enhancedCleaning: true,
    selfCheckIn:      true,
    specificRatings: { cleanliness: 4.8, communication: 4.7, checkIn: 4.9, accuracy: 4.6, location: 4.9, value: 4.5 },
  },
  {
    title:           "Seaside House in Cape Town",
    location:        "Cape Town",
    description:     "A beautiful seaside house with breathtaking views of the Atlantic Ocean. Enjoy Cape Town's vibrant culture, stunning beaches, and Table Mountain.",
    type:            "Entire house",
    bedrooms:        3,
    bathrooms:       2,
    guests:          6,
    price:           180,
    weeklyDiscount:  15,
    cleaningFee:     60,
    serviceFee:      40,
    occupancyTaxes:  25,
    amenities:       ["Wifi", "Pool", "Free parking", "BBQ grill", "Ocean view"],
    images:          ["/images/cape-town-house.jpg"],
    host:            "Amahle",
    rating:          4.8,
    reviews:         210,
    enhancedCleaning: true,
    selfCheckIn:      false,
    specificRatings: { cleanliness: 4.9, communication: 4.8, checkIn: 4.7, accuracy: 4.8, location: 5.0, value: 4.6 },
  },
  {
    title:           "Cozy Loft near Central Park",
    location:        "New York",
    description:     "A charming loft just two blocks from Central Park. High ceilings, exposed brick, and all the character you'd expect from a classic New York space.",
    type:            "Entire loft",
    bedrooms:        1,
    bathrooms:       1,
    guests:          2,
    price:           210,
    weeklyDiscount:  5,
    cleaningFee:     35,
    serviceFee:      30,
    occupancyTaxes:  20,
    amenities:       ["Wifi", "Gym", "Doorman", "Elevator"],
    images:          ["/images/new-york-loft.jpg"],
    host:            "Marcus",
    rating:          4.2,
    reviews:         95,
    enhancedCleaning: false,
    selfCheckIn:      true,
    specificRatings: { cleanliness: 4.3, communication: 4.5, checkIn: 4.2, accuracy: 4.1, location: 4.7, value: 4.0 },
  },
  {
    title:           "Luxury Villa with Private Pool in Bali",
    location:        "Bali",
    description:     "Escape to paradise in this stunning Balinese villa surrounded by lush tropical gardens and a private infinity pool.",
    type:            "Entire villa",
    bedrooms:        4,
    bathrooms:       3,
    guests:          8,
    price:           250,
    weeklyDiscount:  20,
    cleaningFee:     80,
    serviceFee:      60,
    occupancyTaxes:  35,
    amenities:       ["Wifi", "Private pool", "Kitchen", "Garden", "Daily cleaning"],
    images:          ["/images/bali-villa.jpg"],
    host:            "Wayan",
    rating:          4.9,
    reviews:         445,
    enhancedCleaning: true,
    selfCheckIn:      false,
    specificRatings: { cleanliness: 5.0, communication: 4.9, checkIn: 4.8, accuracy: 4.9, location: 4.8, value: 4.9 },
  },
  {
    title:           "Chic Parisian Apartment with Eiffel Tower View",
    location:        "Paris",
    description:     "Wake up to the iconic Eiffel Tower right from your private balcony. Elegantly furnished in the 7th arrondissement.",
    type:            "Entire apartment",
    bedrooms:        2,
    bathrooms:       1,
    guests:          3,
    price:           290,
    weeklyDiscount:  12,
    cleaningFee:     55,
    serviceFee:      45,
    occupancyTaxes:  28,
    amenities:       ["Wifi", "Kitchen", "Balcony", "Eiffel Tower view"],
    images:          ["/images/paris-apartment.jpg"],
    host:            "Céline",
    rating:          4.7,
    reviews:         380,
    enhancedCleaning: true,
    selfCheckIn:      true,
    specificRatings: { cleanliness: 4.8, communication: 4.7, checkIn: 4.9, accuracy: 4.8, location: 5.0, value: 4.5 },
  },
];

// ── Runner ────────────────────────────────────────────────

async function seed() {
  try {
    console.log("Connecting to MongoDB…");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected.");

    // Clear existing data
    await User.deleteMany({});
    await Accommodation.deleteMany({});
    console.log("✓ Cleared existing users and accommodations.");

    // Insert users (passwords auto-hashed by pre-save hook)
    const createdUsers = await User.create(users);
    console.log(`✓ Seeded ${createdUsers.length} users:`);
    createdUsers.forEach((u) =>
      console.log(`   ${u.role.padEnd(6)} | ${u.email}`)
    );

    // Attach host_id of the host user to accommodations
    const hostUser = createdUsers.find((u) => u.role === "host");
    const accsWithHost = accommodations.map((a) => ({
      ...a,
      host_id: hostUser?._id,
    }));

    const createdAccs = await Accommodation.create(accsWithHost);
    console.log(`✓ Seeded ${createdAccs.length} accommodations.`);

    console.log("\n── Login credentials ──────────────────────────");
    console.log("  Admin : admin@example.com / admin123");
    console.log("  Host  : jane@example.com  / password321");
    console.log("  User  : john@example.com  / password123");
    console.log("───────────────────────────────────────────────\n");
  } catch (err) {
    console.error("✗ Seed failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

seed();
