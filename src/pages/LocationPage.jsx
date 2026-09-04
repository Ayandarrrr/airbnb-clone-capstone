// src/pages/LocationPage.jsx
// Location listings page — shown when the user selects a destination.
// Per brief: "Location Filter", "Location Cards", and a heading showing
// "Total accommodations for the selected location and location name".
// Fetches from backend; gracefully falls back to dummy data when offline.
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LocationFilter from "../components/LocationFilter";
import LocationCard from "../components/LocationCard";
import Spinner from "../components/Spinner";
import dummyData from "../data/dummyAccommodations";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function LocationPage() {
  const { locationName } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  // ── Fetch listings matching the selected location ──────
  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API}/api/accommodations`, {
        params: { location: locationName },
      });
      setListings(res.data);
    } catch {
      // Backend not available — filter dummy data by location name
      const filtered = dummyData.filter(
        (l) => l.location.toLowerCase() === locationName.toLowerCase()
      );
      setListings(filtered);
    } finally {
      setLoading(false);
    }
  }, [locationName]);

  // Re-fetch whenever the location in the URL changes
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return (
    <main className="location-page">
      {/* ── Heading: total + location name (per brief) ── */}
      <div className="location-page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            {loading ? "Loading…" : `${listings.length} stay${listings.length !== 1 ? "s" : ""} in ${locationName}`}
          </h1>
          {!loading && (
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: 4 }}>
              {listings.length > 0
                ? "Prices may vary. Dates not selected."
                : "Try another destination."}
            </p>
          )}
        </div>

        {/* ── Location filter ── */}
        <LocationFilter />
      </div>

      {/* ── Loading state ── */}
      {loading && <Spinner message={`Finding stays in ${locationName}…`} />}

      {/* ── Error / empty state ── */}
      {!loading && error && (
        <div className="page-error">
          <p>{error}</p>
          <button onClick={fetchListings}>Retry</button>
        </div>
      )}

      {/* ── Listings ── */}
      {!loading && !error && (
        <div className="location-cards-list">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <LocationCard key={listing._id || listing.id} listing={listing} />
            ))
          ) : (
            <div style={{ padding: "60px 0", textAlign: "center", color: "var(--text-muted)" }}>
              <span style={{ fontSize: "3rem", display: "block", marginBottom: 12 }}>🏠</span>
              <p>No stays found in <strong>{locationName}</strong>.</p>
              <p style={{ marginTop: 8 }}>Try Johannesburg, Cape Town, Durban, or Pretoria.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default LocationPage;
