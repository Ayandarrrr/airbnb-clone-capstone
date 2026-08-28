// src/App.jsx — root component with all routing and auth provider
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import LocationPage from "./pages/LocationPage";
import LocationDetailsPage from "./pages/LocationDetailsPage";

// Auth pages
import LoginPage from "./pages/LoginPage";
import ReservationsPage from "./pages/ReservationsPage";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateListingPage from "./pages/admin/CreateListingPage";
import ViewListingsPage from "./pages/admin/ViewListingsPage";
import UpdateListingPage from "./pages/admin/UpdateListingPage";

import NotFoundPage from "./pages/NotFoundPage";
// Global styles
import "./styles/global.css";
import "./styles/global.css";

function App() {
  return (
    // AuthProvider wraps everything so any component can access auth state
    <AuthProvider>
      <BrowserRouter>
        {/* Header always visible — it adapts its UI based on auth state */}
        <Header />

        <Routes>
          {/* ── Public routes ── */}
          <Route path="/" element={<Home />} />
          <Route path="/locations/:locationName" element={<LocationPage />} />
          <Route path="/listing/:id" element={<LocationDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute>
                <ReservationsPage />
              </ProtectedRoute>
            }
          />

          {/* ── Protected admin routes ── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create"
            element={
              <ProtectedRoute>
                <CreateListingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/listings"
            element={
              <ProtectedRoute>
                <ViewListingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <ProtectedRoute>
                <UpdateListingPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Footer always visible */}
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
