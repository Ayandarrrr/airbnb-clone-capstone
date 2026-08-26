// src/components/LocationFilter.jsx
import { useNavigate, useParams } from "react-router-dom";

const locations = ["New York", "Cape Town", "Bali", "Paris"];

function LocationFilter() {
  const navigate = useNavigate();
  const { locationName } = useParams();

  const handleChange = (e) => {
    navigate(`/l+ocations/${e.target.value}`);
  };

  return (
    <select className="location-filter" value={locationName || ""} onChange={handleChange}>
      <option value="" disabled>Select a location</option>
      {locations.map((loc) => (
        <option key={loc} value={loc}>{loc}</option>
      ))}
    </select>
  );
}

export default LocationFilter;