// src/components/LocationFilter.jsx
// Destination dropdown used in both the Header (no route params) and
// the LocationPage (has :locationName param).
// useParams is guarded — it returns {} when rendered outside a matched route,
// so accessing locationName is always safe.
import { useNavigate, useParams } from "react-router-dom";

const locations = ["New York", "Cape Town", "Bali", "Paris"];

function LocationFilter() {
  const navigate = useNavigate();

  // useParams() safely returns {} when this component is rendered outside
  // a route that contains :locationName (e.g. inside the Header on the home page).
  const params = useParams();
  const locationName = params.locationName || "";

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      navigate(`/locations/${encodeURIComponent(selected)}`);
    }
  };

  return (
    <select
      className="location-filter"
      value={locationName}
      onChange={handleChange}
      aria-label="Select a destination"
    >
      <option value="" disabled>
        Where are you going?
      </option>
      {locations.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
}

export default LocationFilter;
