// src/components/LocationCard.jsx
// Card shown in the Location Page listing.
// Layout: image left, details right.
// Shows: type, title, amenities, star rating, reviews, price/night.
import { Link } from "react-router-dom";

function LocationCard({ listing }) {
  const id = listing._id || listing.id;

  return (
    <Link to={`/listing/${id}`} className="location-card" aria-label={`View ${listing.title}`}>
      {/* Left: main image */}
      <img
        src={listing.images?.[0] || "/images/placeholder.jpg"}
        alt={listing.title}
        className="location-card-image"
      />

      {/* Right: details */}
      <div className="location-card-details">
        <p className="location-card-type">{listing.type}</p>
        <h3>{listing.title}</h3>

        {listing.bedrooms !== undefined && (
          <p className="location-card-specs">
            {listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""} ·{" "}
            {listing.bathrooms} bath{listing.bathrooms !== 1 ? "s" : ""} ·{" "}
            Up to {listing.guests} guests
          </p>
        )}

        <p className="location-card-amenities">
          {(listing.amenities || []).slice(0, 3).join(" · ")}
        </p>

        <div className="location-card-meta">
          <span className="location-card-rating">
            <strong>{listing.rating}</strong>
            <span className="location-card-reviews"> ({listing.reviews} reviews)</span>
          </span>
          <span className="location-card-price">
            <strong>R{listing.price}</strong> / night
          </span>
        </div>
      </div>
    </Link>
  );
}

export default LocationCard;