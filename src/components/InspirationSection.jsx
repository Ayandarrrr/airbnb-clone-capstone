// src/components/InspirationSection.jsx
import { Link } from "react-router-dom";

const destinations = [
  { name: "Johannesburg", image: "/images/property-1.jpg", info: "The City of Gold" },
  { name: "Cape Town", image: "/images/property-3.jpg", info: "Table Mountain & beaches" },
  { name: "Durban", image: "/images/property-5.jpg", info: "Sun, surf & curry" },
  { name: "Pretoria", image: "/images/property-7.jpg", info: "Jacaranda City" },
];

function InspirationSection() {
  return (
    <section className="inspiration-section" id="inspiration">
      <h2>Inspiration for your next trip</h2>
      <div className="card-grid">
        {destinations.map((dest) => (
          <Link to={`/locations/${dest.name}`} key={dest.name} className="dest-card">
            <img src={dest.image} alt={dest.name} />
            <h3>{dest.name}</h3>
            <p>{dest.info}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default InspirationSection;