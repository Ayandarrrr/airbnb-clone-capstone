// src/data/dummyAccommodations.js
// Offline fallback data — used when the backend is not available.
// All images use Unsplash Source URLs that are relevant to each
// property type and city (apartments, villas, houses, etc.).
// 6 listings per city: Johannesburg, Cape Town, Durban, Pretoria.

// ── Curated Unsplash image sets per property type ─────────────────────────
// Each set has 5 images so the gallery (1 large + 4 small) is always full.

const IMAGES = {
  // ── Apartments ────────────────────────────────────────────
  apartment: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80", // modern living room
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", // open kitchen
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", // bedroom
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80", // bathroom
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", // city view balcony
  ],
  apartment2: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", // bright apartment
    "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80", // living space
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", // kitchen
    "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80", // bedroom
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80", // bathroom
  ],
  // ── Houses ────────────────────────────────────────────────
  house: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", // modern house exterior
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", // house with pool
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80", // living room
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", // backyard/garden
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80", // master bedroom
  ],
  house2: [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", // suburban house
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", // house entrance
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", // kitchen
    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80", // dining area
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80", // bedroom
  ],
  // ── Villas ────────────────────────────────────────────────
  villa: [
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80", // luxury villa pool
    "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&q=80", // villa exterior
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80", // villa interior
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80", // beach villa
    "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?w=800&q=80", // villa bedroom
  ],
  // ── Lofts ─────────────────────────────────────────────────
  loft: [
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80", // industrial loft
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80", // loft living area
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", // open plan loft
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", // loft bedroom
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80", // loft kitchen
  ],
  // ── Private rooms ─────────────────────────────────────────
  room: [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", // cosy room
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80", // guest bedroom
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80", // tidy bedroom
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80", // room with view
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80", // bright room
  ],
  // ── Cottages ──────────────────────────────────────────────
  cottage: [
    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", // garden cottage
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80", // cottage exterior
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", // cosy interior
    "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&q=80", // cottage bedroom
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", // scenic garden
  ],
  // ── Seaside / ocean views ─────────────────────────────────
  seaside: [
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80", // ocean view house
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", // beach villa
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", // ocean terrace
    "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80", // beach pool
    "https://images.unsplash.com/photo-1540541338537-51e2c550e8f3?w=800&q=80", // seaside living
  ],
};

const accommodations = [
  // ══════════════════════════════════════════════════════════
  // JOHANNESBURG
  // ══════════════════════════════════════════════════════════
  {
    id: 1,
    images: IMAGES.apartment,
    type: "Entire apartment",
    location: "Johannesburg",
    guests: 4, bedrooms: 2, bathrooms: 2,
    amenities: ["Wifi", "Kitchen", "Free parking", "Air conditioning", "Washer"],
    rating: 4.5, reviews: 320, price: 320,
    title: "Modern Apartment in Sandton, Johannesburg",
    host: "Johann",
    weeklyDiscount: 10, cleaningFee: 50, serviceFee: 50, occupancyTaxes: 30,
    enhancedCleaning: true, selfCheckIn: true,
    description:
      "Stay in the heart of Sandton, Johannesburg's financial hub. Steps away from top restaurants, the Sandton City mall, and business districts. Fully equipped modern apartment with high-speed WiFi.",
    specificRatings: { cleanliness: 4.8, communication: 4.7, checkIn: 4.9, accuracy: 4.6, location: 4.9, value: 4.5 },
  },
  {
    id: 2,
    images: IMAGES.apartment2,
    type: "Entire apartment",
    location: "Johannesburg",
    guests: 3, bedrooms: 2, bathrooms: 1,
    amenities: ["Wifi", "Kitchen", "Balcony", "City view"],
    rating: 4.7, reviews: 380, price: 290,
    title: "Chic Apartment with City View in Rosebank",
    host: "Céline",
    weeklyDiscount: 12, cleaningFee: 55, serviceFee: 45, occupancyTaxes: 28,
    enhancedCleaning: true, selfCheckIn: true,
    description:
      "Wake up to panoramic Johannesburg city views from your private balcony. Elegantly furnished in Rosebank, steps from top art galleries, cafés, and the Zone shopping centre.",
    specificRatings: { cleanliness: 4.8, communication: 4.7, checkIn: 4.9, accuracy: 4.8, location: 5.0, value: 4.5 },
  },
  {
    id: 3,
    images: IMAGES.house,
    type: "Entire house",
    location: "Johannesburg",
    guests: 6, bedrooms: 3, bathrooms: 2,
    amenities: ["Wifi", "Pool", "Braai area", "Free parking", "Garden"],
    rating: 4.6, reviews: 150, price: 350,
    title: "Family House with Pool in Fourways",
    host: "Naledi",
    weeklyDiscount: 10, cleaningFee: 60, serviceFee: 45, occupancyTaxes: 25,
    enhancedCleaning: true, selfCheckIn: false,
    description:
      "Spacious family home in leafy Fourways with a private pool and braai area — perfect for groups wanting a relaxed base close to Montecasino, shopping, and golf estates.",
  },
  {
    id: 4,
    images: IMAGES.room,
    type: "Private room",
    location: "Johannesburg",
    guests: 2, bedrooms: 1, bathrooms: 1,
    amenities: ["Wifi", "Breakfast included", "Free parking"],
    rating: 4.4, reviews: 88, price: 150,
    title: "Cosy Guest Room in Melville",
    host: "Sipho",
    weeklyDiscount: 5, cleaningFee: 25, serviceFee: 20, occupancyTaxes: 12,
    enhancedCleaning: false, selfCheckIn: true,
    description:
      "A comfortable private room in the artsy, walkable Melville neighbourhood — close to cafés, live music venues, and the vibrant 7th Street nightlife scene.",
  },
  {
    id: 5,
    images: IMAGES.loft,
    type: "Entire loft",
    location: "Johannesburg",
    guests: 2, bedrooms: 1, bathrooms: 1,
    amenities: ["Wifi", "Gym", "Rooftop access", "Elevator"],
    rating: 4.3, reviews: 64, price: 260,
    title: "Industrial Loft in Maboneng Precinct",
    host: "Thabo",
    weeklyDiscount: 8, cleaningFee: 40, serviceFee: 30, occupancyTaxes: 18,
    enhancedCleaning: true, selfCheckIn: true,
    description:
      "Exposed brick, high ceilings, and big windows in the creative heart of Maboneng — surrounded by street art, weekend markets, and rooftop bars.",
  },
  {
    id: 6,
    images: IMAGES.apartment2,
    type: "Entire apartment",
    location: "Johannesburg",
    guests: 5, bedrooms: 3, bathrooms: 2,
    amenities: ["Wifi", "Kitchen", "Free parking", "Security estate"],
    rating: 4.5, reviews: 132, price: 300,
    title: "Secure Family Apartment in Bryanston",
    host: "Lerato",
    weeklyDiscount: 10, cleaningFee: 45, serviceFee: 35, occupancyTaxes: 20,
    enhancedCleaning: true, selfCheckIn: false,
    description:
      "A quiet, secure apartment in a gated Bryanston estate — ideal for families needing extra space and peace of mind, with easy highway access to all major JHB destinations.",
  },

  // ══════════════════════════════════════════════════════════
  // CAPE TOWN
  // ══════════════════════════════════════════════════════════
  {
    id: 7,
    images: IMAGES.seaside,
    type: "Entire house",
    location: "Cape Town",
    guests: 6, bedrooms: 3, bathrooms: 2,
    amenities: ["Wifi", "Pool", "Free parking", "BBQ grill", "Ocean view"],
    rating: 4.8, reviews: 210, price: 180,
    title: "Seaside House in Camps Bay",
    host: "Amahle",
    weeklyDiscount: 15, cleaningFee: 60, serviceFee: 40, occupancyTaxes: 25,
    enhancedCleaning: true, selfCheckIn: false,
    description:
      "A beautiful seaside house with breathtaking views of the Atlantic Ocean. Enjoy Cape Town's vibrant culture, stunning beaches, and Table Mountain right on your doorstep.",
    specificRatings: { cleanliness: 4.9, communication: 4.8, checkIn: 4.7, accuracy: 4.8, location: 5.0, value: 4.6 },
  },
  {
    id: 8,
    images: IMAGES.apartment,
    type: "Entire apartment",
    location: "Cape Town",
    guests: 4, bedrooms: 2, bathrooms: 1,
    amenities: ["Wifi", "Kitchen", "Mountain view", "Balcony"],
    rating: 4.7, reviews: 198, price: 220,
    title: "Apartment with Table Mountain Views, Gardens",
    host: "Ridwaan",
    weeklyDiscount: 10, cleaningFee: 45, serviceFee: 35, occupancyTaxes: 20,
    enhancedCleaning: true, selfCheckIn: true,
    description:
      "Wake up to Table Mountain right outside your window. Located in leafy Gardens, walking distance to the city bowl and the trendy restaurants on Kloof Street.",
  },
  {
    id: 9,
    images: IMAGES.villa,
    type: "Entire villa",
    location: "Cape Town",
    guests: 8, bedrooms: 4, bathrooms: 3,
    amenities: ["Wifi", "Private pool", "Wine cellar", "Garden", "Chef available"],
    rating: 4.9, reviews: 260, price: 450,
    title: "Luxury Villa in the Constantia Winelands",
    host: "Werner",
    weeklyDiscount: 15, cleaningFee: 80, serviceFee: 60, occupancyTaxes: 35,
    enhancedCleaning: true, selfCheckIn: false,
    description:
      "An elegant vineyard villa in Constantia, surrounded by historic wine estates, with a private pool and optional in-house chef. Perfect for celebrations and special getaways.",
  },
  {
    id: 10,
    images: IMAGES.room,
    type: "Private room",
    location: "Cape Town",
    guests: 2, bedrooms: 1, bathrooms: 1,
    amenities: ["Wifi", "Breakfast included", "Near beach"],
    rating: 4.5, reviews: 75, price: 120,
    title: "Beachside Room in Muizenberg",
    host: "Zanele",
    weeklyDiscount: 5, cleaningFee: 20, serviceFee: 15, occupancyTaxes: 10,
    enhancedCleaning: false, selfCheckIn: true,
    description:
      "A relaxed, budget-friendly room minutes from Muizenberg's famous surf beach and the iconic colourful beach huts. Great base for exploring the Southern Peninsula.",
  },
  {
    id: 11,
    images: IMAGES.apartment2,
    type: "Entire apartment",
    location: "Cape Town",
    guests: 3, bedrooms: 1, bathrooms: 1,
    amenities: ["Wifi", "Kitchen", "Harbour view", "Gym"],
    rating: 4.6, reviews: 142, price: 240,
    title: "Waterfront Apartment near the V&A",
    host: "Chantal",
    weeklyDiscount: 10, cleaningFee: 40, serviceFee: 30, occupancyTaxes: 18,
    enhancedCleaning: true, selfCheckIn: true,
    description:
      "Stylish apartment steps from the V&A Waterfront's shops, restaurants, and harbour views — an easy base for exploring the Mother City.",
  },
  {
    id: 12,
    images: IMAGES.cottage,
    type: "Entire cottage",
    location: "Cape Town",
    guests: 4, bedrooms: 2, bathrooms: 1,
    amenities: ["Wifi", "Garden", "Free parking", "Fireplace"],
    rating: 4.4, reviews: 60, price: 190,
    title: "Charming Cottage in Simon's Town",
    host: "Pieter",
    weeklyDiscount: 8, cleaningFee: 35, serviceFee: 25, occupancyTaxes: 15,
    enhancedCleaning: false, selfCheckIn: true,
    description:
      "A cosy cottage near Boulders Beach's penguin colony, with a private garden and easy access to Simon's Town's harbour walks and seafood restaurants.",
  },

  // ══════════════════════════════════════════════════════════
  // DURBAN
  // ══════════════════════════════════════════════════════════
  {
    id: 13,
    images: IMAGES.loft,
    type: "Entire loft",
    location: "Durban",
    guests: 2, bedrooms: 1, bathrooms: 1,
    amenities: ["Wifi", "Gym", "Doorman", "Elevator"],
    rating: 4.2, reviews: 95, price: 210,
    title: "Cozy Loft near Durban Beachfront",
    host: "Marcus",
    weeklyDiscount: 5, cleaningFee: 35, serviceFee: 30, occupancyTaxes: 20,
    enhancedCleaning: false, selfCheckIn: true,
    description:
      "A charming loft just two blocks from Durban's Golden Mile beachfront. Great for a relaxed coastal getaway with easy access to uShaka Marine World.",
    specificRatings: { cleanliness: 4.3, communication: 4.5, checkIn: 4.2, accuracy: 4.1, location: 4.7, value: 4.0 },
  },
  {
    id: 14,
    images: IMAGES.seaside,
    type: "Entire apartment",
    location: "Durban",
    guests: 4, bedrooms: 2, bathrooms: 2,
    amenities: ["Wifi", "Pool", "Sea view", "Free parking"],
    rating: 4.6, reviews: 175, price: 250,
    title: "Sea-View Apartment in Umhlanga",
    host: "Priya",
    weeklyDiscount: 12, cleaningFee: 45, serviceFee: 35, occupancyTaxes: 20,
    enhancedCleaning: true, selfCheckIn: true,
    description:
      "Bright apartment overlooking the Indian Ocean in upmarket Umhlanga, close to the promenade, Gateway casino, and top restaurants.",
  },
  {
    id: 15,
    images: IMAGES.house2,
    type: "Entire house",
    location: "Durban",
    guests: 7, bedrooms: 4, bathrooms: 3,
    amenities: ["Wifi", "Pool", "Braai area", "Garden", "Free parking"],
    rating: 4.7, reviews: 140, price: 310,
    title: "Family House with Garden in Kloof",
    host: "Nomvula",
    weeklyDiscount: 12, cleaningFee: 55, serviceFee: 40, occupancyTaxes: 25,
    enhancedCleaning: true, selfCheckIn: false,
    description:
      "Spacious family home in the leafy Kloof suburb — a peaceful base with easy access to Durban's beaches and the Valley of a Thousand Hills.",
  },
  {
    id: 16,
    images: IMAGES.room,
    type: "Private room",
    location: "Durban",
    guests: 2, bedrooms: 1, bathrooms: 1,
    amenities: ["Wifi", "Breakfast included", "Near beach"],
    rating: 4.3, reviews: 52, price: 100,
    title: "Budget Room near Durban Beachfront",
    host: "Ayesha",
    weeklyDiscount: 5, cleaningFee: 15, serviceFee: 10, occupancyTaxes: 8,
    enhancedCleaning: false, selfCheckIn: true,
    description:
      "Simple, affordable room a short walk from the beachfront promenade and uShaka Marine World — ideal for solo travellers and couples.",
  },
  {
    id: 17,
    images: IMAGES.villa,
    type: "Entire villa",
    location: "Durban",
    guests: 8, bedrooms: 4, bathrooms: 3,
    amenities: ["Wifi", "Private pool", "Sea view", "Garden", "Daily cleaning"],
    rating: 4.8, reviews: 190, price: 400,
    title: "Luxury Villa in Ballito",
    host: "Kagiso",
    weeklyDiscount: 15, cleaningFee: 70, serviceFee: 50, occupancyTaxes: 30,
    enhancedCleaning: true, selfCheckIn: false,
    description:
      "A high-end villa in Ballito with sweeping sea views and a private pool — a popular spot for family holidays along the KwaZulu-Natal North Coast.",
  },
  {
    id: 18,
    images: IMAGES.apartment,
    type: "Entire apartment",
    location: "Durban",
    guests: 3, bedrooms: 1, bathrooms: 1,
    amenities: ["Wifi", "Kitchen", "Gym", "Free parking"],
    rating: 4.4, reviews: 84, price: 170,
    title: "Modern Apartment in Morningside",
    host: "Sibongile",
    weeklyDiscount: 8, cleaningFee: 30, serviceFee: 22, occupancyTaxes: 14,
    enhancedCleaning: true, selfCheckIn: true,
    description:
      "Comfortable, well-located apartment in Morningside — close to the Musgrave shopping centre and Durban's business district.",
  },

  // ══════════════════════════════════════════════════════════
  // PRETORIA
  // ══════════════════════════════════════════════════════════
  {
    id: 19,
    images: IMAGES.villa,
    type: "Entire villa",
    location: "Pretoria",
    guests: 8, bedrooms: 4, bathrooms: 3,
    amenities: ["Wifi", "Private pool", "Kitchen", "Garden", "Daily cleaning"],
    rating: 4.9, reviews: 445, price: 250,
    title: "Luxury Villa with Private Pool in Pretoria",
    host: "Wayan",
    weeklyDiscount: 20, cleaningFee: 80, serviceFee: 60, occupancyTaxes: 35,
    enhancedCleaning: true, selfCheckIn: false,
    description:
      "Escape to this stunning Pretoria villa surrounded by lush gardens and a private pool, minutes from the Jacaranda-lined streets and Union Buildings.",
    specificRatings: { cleanliness: 5.0, communication: 4.9, checkIn: 4.8, accuracy: 4.9, location: 4.8, value: 4.9 },
  },
  {
    id: 20,
    images: IMAGES.apartment2,
    type: "Entire apartment",
    location: "Pretoria",
    guests: 3, bedrooms: 2, bathrooms: 1,
    amenities: ["Wifi", "Kitchen", "Balcony", "Free parking"],
    rating: 4.5, reviews: 110, price: 200,
    title: "Stylish Apartment in Brooklyn",
    host: "Retha",
    weeklyDiscount: 10, cleaningFee: 40, serviceFee: 28, occupancyTaxes: 16,
    enhancedCleaning: true, selfCheckIn: true,
    description:
      "A modern apartment in the leafy Brooklyn suburb, close to embassies, restaurants, and the Menlyn shopping precinct.",
  },
  {
    id: 21,
    images: IMAGES.house,
    type: "Entire house",
    location: "Pretoria",
    guests: 6, bedrooms: 3, bathrooms: 2,
    amenities: ["Wifi", "Pool", "Braai area", "Garden", "Free parking"],
    rating: 4.6, reviews: 128, price: 280,
    title: "Family Home with Pool in Waterkloof",
    host: "Deon",
    weeklyDiscount: 12, cleaningFee: 50, serviceFee: 38, occupancyTaxes: 22,
    enhancedCleaning: true, selfCheckIn: false,
    description:
      "Spacious home in the historic, tree-lined Waterkloof suburb — a quiet, upmarket base close to Pretoria's embassies and parks.",
  },
  {
    id: 22,
    images: IMAGES.room,
    type: "Private room",
    location: "Pretoria",
    guests: 2, bedrooms: 1, bathrooms: 1,
    amenities: ["Wifi", "Breakfast included", "Free parking"],
    rating: 4.3, reviews: 58, price: 130,
    title: "Guest Room near University of Pretoria",
    host: "Karabo",
    weeklyDiscount: 5, cleaningFee: 20, serviceFee: 15, occupancyTaxes: 10,
    enhancedCleaning: false, selfCheckIn: true,
    description:
      "Comfortable and affordable, this room in Hatfield is ideal for visiting the University of Pretoria or exploring the student-friendly area.",
  },
  {
    id: 23,
    images: IMAGES.apartment,
    type: "Entire apartment",
    location: "Pretoria",
    guests: 4, bedrooms: 2, bathrooms: 2,
    amenities: ["Wifi", "Kitchen", "Gym", "Security estate"],
    rating: 4.7, reviews: 96, price: 230,
    title: "Secure Apartment in Menlyn",
    host: "Naomi",
    weeklyDiscount: 10, cleaningFee: 40, serviceFee: 30, occupancyTaxes: 18,
    enhancedCleaning: true, selfCheckIn: true,
    description:
      "Well-appointed apartment in a secure Menlyn estate, right next to South Africa's largest shopping mall and with easy highway access.",
  },
  {
    id: 24,
    images: IMAGES.cottage,
    type: "Entire cottage",
    location: "Pretoria",
    guests: 3, bedrooms: 1, bathrooms: 1,
    amenities: ["Wifi", "Garden", "Fireplace", "Free parking"],
    rating: 4.4, reviews: 47, price: 165,
    title: "Garden Cottage in Moreleta Park",
    host: "Elmarie",
    weeklyDiscount: 8, cleaningFee: 30, serviceFee: 22, occupancyTaxes: 12,
    enhancedCleaning: false, selfCheckIn: true,
    description:
      "A peaceful garden cottage in family-friendly Moreleta Park, close to nature reserves and quiet suburban living.",
  },
];

export default accommodations;
