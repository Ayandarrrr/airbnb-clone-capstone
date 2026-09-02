// src/components/InspirationSection.jsx
import { Link } from "react-router-dom";

const destinations = [
  { name: "Johannesburg", image: "https://picsum.photos/seed/property1/800/600", info: "The City of Gold" },
  { name: "Cape Town", image: "https://picsum.photos/seed/property3/800/600", info: "Table Mountain & beaches" },
  { name: "Durban", image: "https://picsum.photos/seed/property5/800/600", info: "Sun, surf & curry" },
  { name: "Pretoria", image: "https://picsum.photos/seed/property7/800/600", info: "Jacaranda City" },
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