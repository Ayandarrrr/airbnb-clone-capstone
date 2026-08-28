// src/components/LocationFilter.jsx
// Dropdown that navigates to the Location page for the selected destination.
// Fixed: was using "/l+ocations/" (typo) — now correctly uses "/locations/".
import { useNavigate, useParams } from "react-router-dom";

const locations = ["New York", "Cape Town", "Bali", "Paris"];

function LocationFilter() {
  const navigate = useNavigate();
  // useParams picks up locationName when rendered inside LocationPage,
  // gracefully returns undefined elsewhere (e.g. in the Header).
  const { locationName } = useParams();

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      navigate(`/locations/${encodeURIComponent(selected)}`);
    }
  };

  return (
    <select
      className="location-filter"
      value={locationName || ""}
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
