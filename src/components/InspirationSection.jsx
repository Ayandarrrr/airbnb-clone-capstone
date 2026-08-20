// src/components/InspirationSection.jsx
import { Link } from "react-router-dom";

const destinations = [
  { name: "New York", image: "/images/new-york.jpg", info: "3.5 hours away" },
  { name: "Cape Town", image: "/images/cape-town.jpg", info: "1 hour away" },
  { name: "Bali", image: "/images/bali.jpg", info: "8 hours away" },
  { name: "Paris", image: "/images/paris.jpg", info: "11 hours away" },
];

function InspirationSection() {
  return (
    <section className="inspiration-section">
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