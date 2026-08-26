// src/pages/LocationPage.jsx
import { useParams } from "react-router-dom";
import LocationFilter from "../components/LocationFilter";
import LocationCard from "../components/LocationCard";
import accommodations from "../data/dummyAccommodations";

function LocationPage() {
  const { locationName } = useParams();

  const filteredListings = accommodations.filter(
    (listing) => listing.location === locationName
  );

  return (
    <main className="location-page">
      <div className="location-page-header">
        <h2>{filteredListings.length} stays in {locationName}</h2>
        <LocationFilter />
      </div>

      <div className="location-cards-list">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <LocationCard key={listing.id} listing={listing} />
          ))
        ) : (
          <p>No stays found in {locationName}. Try another location.</p>
        )}
      </div>
    </main>
  );
}

export default LocationPage;