# Tina Stays — Airbnb Clone Capstone

A full-stack Airbnb-inspired property rental platform built with **React**, **Node.js/Express**, and **MongoDB**.

---

## Project Structure

```
TinaStays/
├── backend/                  # Node.js / Express API server
│   ├── controllers/          # Route handler logic
│   │   ├── accommodationController.js
│   │   ├── reservationController.js
│   │   └── userController.js
│   ├── middleware/           # Auth, error handling, logging, file upload
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── requestLogger.js
│   │   └── upload.js         # Multer image upload middleware
│   ├── models/               # Mongoose schemas
│   │   ├── Accommodation.js
│   │   ├── Reservation.js
│   │   └── User.js
│   ├── routes/               # Express routers
│   │   ├── accommodationRoutes.js
│   │   ├── reservationRoutes.js
│   │   └── userRoutes.js
│   ├── .env.example          # Environment variable template
│   ├── .gitignore
│   ├── package.json
│   ├── seed.js               # Database seeder
│   └── server.js             # Express entry point
├── public/                   # Static assets (images, favicon)
├── src/                      # React frontend
│   ├── components/           # Reusable UI components
│   ├── context/              # AuthContext (JWT state)
│   ├── data/                 # Dummy accommodation data (offline fallback)
│   ├── pages/                # Route-level page components
│   │   ├── admin/            # Admin dashboard pages
│   │   ├── Home.jsx
│   │   ├── LocationPage.jsx
│   │   ├── LocationDetailsPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ReservationsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── styles/
│   │   └── global.css        # Airbnb-inspired design system
│   ├── App.jsx               # Root router + auth provider
│   └── index.js
├── Procfile                  # Heroku deployment config
└── package.json              # React app dependencies
```

---

## Technology Stack

| Layer       | Technology                            |
|-------------|---------------------------------------|
| Frontend    | React 19, React Router 7, Axios       |
| Backend     | Node.js, Express 4                    |
| Database    | MongoDB Atlas + Mongoose 8            |
| Auth        | JWT (jsonwebtoken) + bcryptjs         |
| File Upload | Multer (image upload, optional)       |
| Deployment  | Heroku (Procfile included)            |

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd TinaStays
```

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
# Edit .env and fill in MONGO_URI and JWT_SECRET
npm install
npm run seed     # Seeds DB with users + sample listings
npm run dev      # Starts backend on http://localhost:5000
```

**Seed credentials:**
| Role  | Email                  | Password     |
|-------|------------------------|--------------|
| Admin | admin@example.com      | admin123     |
| Host  | jane@example.com       | password321  |
| User  | john@example.com       | password123  |

### 3. Set up the frontend

```bash
# From the project root
npm install
npm start        # Starts React app on http://localhost:3000
```

---

## Features

### Airbnb Frontend (140 marks)
- **Home Page** — Hero banner with CTA, inspiration cards, experiences section, ShopAirbnb section, future getaways with functional tabs, footer with 4 link columns + social links
- **Location Page** — Filter by city, location cards with image/type/amenities/rating/price
- **Location Details Page** — Image gallery (1 large + 4 small), heading/subheading, cost calculator with dynamic pricing, weekly discount, static info sections (rules, safety, cancellation), host details, reviews

### Admin Frontend (100 marks)
- **Login Page** — Email/password form with validation, JWT auth, redirect on success
- **Admin Dashboard** — Live stats (listings, reservations), quick-action links
- **Create Listing** — Full form with all required fields, image upload, validation
- **View Listings** — Table with thumbnail, title, location, price, edit/delete actions
- **Update Listing** — Pre-filled form, image management, save changes
- **Header** — Logo, greeting, dropdown with reservations + logout, "Become a host" when logged out

### Node.js Backend (150 marks)
- **Accommodation CRUD** — GET (all/filter), GET by ID, POST, PUT, DELETE + image upload endpoint
- **User Auth** — Register, login (returns JWT), get current user (`/api/users/me`)
- **Reservation Management** — Create, list by host, list by user, delete/cancel
- **JWT Middleware** — `protect` and `requireRole` guards on protected routes
- **Error Handling** — Centralised handler for Mongoose/JWT/HTTP errors with correct status codes
- **Request Logger** — Coloured console logging in development mode

---

## API Endpoints

### Accommodations
| Method | Endpoint                              | Auth     | Description              |
|--------|---------------------------------------|----------|--------------------------|
| GET    | `/api/accommodations`                 | Public   | List all (filter by `?location=`) |
| GET    | `/api/accommodations/:id`             | Public   | Get single listing       |
| POST   | `/api/accommodations`                 | Required | Create listing           |
| PUT    | `/api/accommodations/:id`             | Required | Update listing           |
| DELETE | `/api/accommodations/:id`             | Required | Delete listing           |
| POST   | `/api/accommodations/upload/images`   | Required | Upload images (Multer)   |

### Users
| Method | Endpoint               | Auth     | Description        |
|--------|------------------------|----------|--------------------|
| POST   | `/api/users/login`     | Public   | Login, returns JWT |
| POST   | `/api/users/register`  | Public   | Register account   |
| GET    | `/api/users/me`        | Required | Get own profile    |

### Reservations
| Method | Endpoint                       | Auth     | Description              |
|--------|--------------------------------|----------|--------------------------|
| POST   | `/api/reservations`            | Required | Create reservation       |
| GET    | `/api/reservations/host`       | Required | List host's reservations |
| GET    | `/api/reservations/user`       | Required | List user's reservations |
| DELETE | `/api/reservations/:id`        | Required | Cancel reservation       |

---

## Deployment (Heroku)

1. Create a Heroku app and attach the MongoDB Atlas add-on or set `MONGO_URI` config var.
2. Set required config vars:
   ```
   MONGO_URI=<your atlas connection string>
   JWT_SECRET=<long random string>
   NODE_ENV=production
   CLIENT_URL=https://<your-app>.herokuapp.com
   ```
3. Push to Heroku — the `Procfile` starts the backend server; `heroku-postbuild` builds the React app.

---

## Security

- Passwords hashed with **bcryptjs** (12 salt rounds)
- JWT tokens expire after **7 days** (configurable via `JWT_EXPIRES_IN`)
- CORS restricted to known origins
- Multer limits file size to **5 MB** and accepts only image MIME types
- Input validation at both Mongoose schema level and controller level
- Generic error messages on auth failures (no field leaking)
