// src/components/LocationCard.jsx
import { Link } from "react-router-dom";

function LocationCard({ listing }) {
  return (
    <Link to={`/listing/${listing.id}`} className="location-card">
      <img src={listing.images[0]} alt={listing.title} className="location-card-image" />
      <div className="location-card-details">
        <h3>{listing.title}</h3>
        <p className="location-card-type">{listing.type}</p>
        <p className="location-card-amenities">{listing.amenities.join(" · ")}</p>
        <div className="location-card-meta">
          <span>⭐ {listing.rating} ({listing.reviews} reviews)</span>
          <span className="location-card-price">${listing.price} / night</span>
        </div>
      </div>
    </Link>
  );
}

export default LocationCard;