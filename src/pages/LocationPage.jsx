// src/pages/LocationPage.jsx
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LocationFilter from "../components/LocationFilter";
import LocationCard from "../components/LocationCard";
import dummyData from "../data/dummyAccommodations";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function LocationPage() {
  const { locationName } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/accommodations`, {
        params: { location: locationName },
      });
      setListings(res.data);
    } catch {
      setListings(
        dummyData.filter((listing) => listing.location === locationName)
      );
    } finally {
      setLoading(false);
    }
  }, [locationName]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return (
    <main className="location-page">
      <div className="location-page-header">
        <h2>{listings.length} stays in {locationName}</h2>
        <LocationFilter />
      </div>

      {loading ? (
        <p>Loading stays…</p>
      ) : (
        <div className="location-cards-list">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <LocationCard key={listing._id || listing.id} listing={listing} />
            ))
          ) : (
            <p>No stays found in {locationName}. Try another location.</p>
          )}
        </div>
      )}
    </main>
  );
}

export default LocationPage;
