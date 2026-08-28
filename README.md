# Airbnb Clone — Capstone Project

A full-stack Airbnb clone built with React, Node.js, Express, and MongoDB.

## Project Structure

```
airbnb-clone-capstone/
├── src/                  # React frontend
│   ├── components/       # Reusable UI components
│   ├── context/          # AuthContext (JWT)
│   ├── data/             # Dummy data (offline fallback)
│   ├── pages/            # Page components
│   │   └── admin/        # Admin dashboard pages
│   └── styles/           # Global CSS
├── public/               # Static assets + placeholder images
├── backend/              # Node.js / Express API
│   ├── controllers/      # Route handlers
│   ├── middleware/        # JWT auth middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routers
│   ├── seed.js           # Database seeder
│   └── server.js         # Entry point
└── styles/               # Legacy CSS (see src/styles/)
```

## Getting Started

### Frontend

```bash
npm install
npm start
```

Runs on `http://localhost:3000`.

### Backend

```bash
cd backend
npm install
# Copy .env and set your MongoDB URI + JWT secret
npm run dev
```

Runs on `http://localhost:5000`.

### Seed the database

```bash
cd backend
npm run seed
```

Creates test users:
- **Host**: `jane@example.com` / `password321`
- **User**: `john@example.com` / `password123`

## Features

### Frontend
- Home page: hero banner, inspiration cards, experiences, shop section, getaways, footer
- Location page: filter by destination, listing cards with details
- Listing details: image gallery, cost calculator, reservation booking
- JWT authentication with session persistence

### Admin Dashboard
- Login with email + password
- Create / view / update / delete property listings
- View all reservations

### Backend API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/login` | Authenticate user |
| POST | `/api/users/register` | Register new user |
| GET | `/api/accommodations` | List all properties |
| GET | `/api/accommodations/:id` | Get single property |
| POST | `/api/accommodations` | Create property (auth) |
| PUT | `/api/accommodations/:id` | Update property (auth) |
| DELETE | `/api/accommodations/:id` | Delete property (auth) |
| POST | `/api/reservations` | Create reservation (auth) |
| GET | `/api/reservations/host` | Host's reservations (auth) |
| GET | `/api/reservations/user` | User's reservations (auth) |
| DELETE | `/api/reservations/:id` | Cancel reservation (auth) |

## Tech Stack
- **Frontend**: React 19, React Router v7, Axios, JWT-decode
- **Backend**: Node.js, Express 4, MongoDB, Mongoose 8, JWT, bcryptjs
