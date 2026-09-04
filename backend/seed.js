// backend/seed.js
// Seeds the database with:
//   - 3 test users  (admin, host, regular user)
//   - 5 sample accommodation listings across South African cities
//
// Usage: node seed.js  (from the backend/ directory)
// Run once after setting up your .env and MongoDB connection.
require("dotenv").config();
const mongoose      = require("mongoose");
const User          = require("./models/User");
const Accommodation = require("./models/Accommodation");

// ── Seed users ─────────────────────────────────────────────
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

// ── Seed accommodations ────────────────────────────────────
// All listings use South African cities and Unsplash property images.
const accommodations = [
  {
    title:       "Modern Apartment in Sandton, Johannesburg",
    location:    "Johannesburg",
    description: "Stay in the heart of Sandton, Johannesburg's financial hub. Steps away from top restaurants, Sandton City mall, and business districts. Fully equipped modern apartment with high-speed WiFi.",
    type:        "Entire apartment",
    bedrooms: 2, bathrooms: 2, guests: 4, price: 320,
    weeklyDiscount: 10, cleaningFee: 50, serviceFee: 50, occupancyTaxes: 30,
    amenities: ["Wifi", "Kitchen", "Free parking", "Air conditioning", "Washer"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    host: "Johann", rating: 4.5, reviews: 320,
    enhancedCleaning: true, selfCheckIn: true,
    specificRatings: { cleanliness: 4.8, communication: 4.7, checkIn: 4.9, accuracy: 4.6, location: 4.9, value: 4.5 },
  },
  {
    title:       "Seaside House in Camps Bay, Cape Town",
    location:    "Cape Town",
    description: "A beautiful seaside house with breathtaking views of the Atlantic Ocean. Enjoy Cape Town's vibrant culture, stunning beaches, and Table Mountain right on your doorstep.",
    type:        "Entire house",
    bedrooms: 3, bathrooms: 2, guests: 6, price: 180,
    weeklyDiscount: 15, cleaningFee: 60, serviceFee: 40, occupancyTaxes: 25,
    amenities: ["Wifi", "Pool", "Free parking", "BBQ grill", "Ocean view"],
    images: [
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
      "https://images.unsplash.com/photo-1540541338537-51e2c550e8f3?w=800&q=80",
    ],
    host: "Amahle", rating: 4.8, reviews: 210,
    enhancedCleaning: true, selfCheckIn: false,
    specificRatings: { cleanliness: 4.9, communication: 4.8, checkIn: 4.7, accuracy: 4.8, location: 5.0, value: 4.6 },
  },
  {
    title:       "Industrial Loft in Maboneng, Johannesburg",
    location:    "Johannesburg",
    description: "Exposed brick, high ceilings, and big windows in the creative heart of Maboneng — surrounded by street art, weekend markets, and rooftop bars.",
    type:        "Entire loft",
    bedrooms: 1, bathrooms: 1, guests: 2, price: 210,
    weeklyDiscount: 5, cleaningFee: 35, serviceFee: 30, occupancyTaxes: 20,
    amenities: ["Wifi", "Gym", "Rooftop access", "Elevator"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    ],
    host: "Marcus", rating: 4.2, reviews: 95,
    enhancedCleaning: false, selfCheckIn: true,
    specificRatings: { cleanliness: 4.3, communication: 4.5, checkIn: 4.2, accuracy: 4.1, location: 4.7, value: 4.0 },
  },
  {
    title:       "Luxury Villa with Private Pool in Pretoria",
    location:    "Pretoria",
    description: "Escape to this stunning Pretoria villa surrounded by lush gardens and a private pool, minutes from the Jacaranda-lined streets and Union Buildings.",
    type:        "Entire villa",
    bedrooms: 4, bathrooms: 3, guests: 8, price: 250,
    weeklyDiscount: 20, cleaningFee: 80, serviceFee: 60, occupancyTaxes: 35,
    amenities: ["Wifi", "Private pool", "Kitchen", "Garden", "Daily cleaning"],
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?w=800&q=80",
    ],
    host: "Wayan", rating: 4.9, reviews: 445,
    enhancedCleaning: true, selfCheckIn: false,
    specificRatings: { cleanliness: 5.0, communication: 4.9, checkIn: 4.8, accuracy: 4.9, location: 4.8, value: 4.9 },
  },
  {
    title:       "Sea-View Apartment in Umhlanga, Durban",
    location:    "Durban",
    description: "Bright apartment overlooking the Indian Ocean in upmarket Umhlanga, close to the promenade, Gateway casino, and top restaurants.",
    type:        "Entire apartment",
    bedrooms: 2, bathrooms: 2, guests: 4, price: 250,
    weeklyDiscount: 12, cleaningFee: 45, serviceFee: 35, occupancyTaxes: 20,
    amenities: ["Wifi", "Pool", "Sea view", "Free parking"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    ],
    host: "Priya", rating: 4.6, reviews: 175,
    enhancedCleaning: true, selfCheckIn: true,
    specificRatings: { cleanliness: 4.7, communication: 4.6, checkIn: 4.8, accuracy: 4.6, location: 4.9, value: 4.5 },
  },
];

// ── Runner ─────────────────────────────────────────────────
async function seed() {
  try {
    console.log("Connecting to MongoDB…");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected.");

    // Clear existing data
    await User.deleteMany({});
    await Accommodation.deleteMany({});
    console.log("✓ Cleared existing users and accommodations.");

    // Insert users — passwords are auto-hashed by the pre-save hook
    const createdUsers = await User.create(users);
    console.log(`✓ Seeded ${createdUsers.length} users:`);
    createdUsers.forEach((u) =>
      console.log(`   ${u.role.padEnd(6)} | ${u.email}`)
    );

    // Attach the host user's _id to all accommodation listings
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
