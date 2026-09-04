// src/components/InspirationSection.jsx
// "Inspiration for your next trip" section with location cards.
// Per brief: "Inspiration for your next trip (with location cards)".
// Cards link directly to the corresponding Location Page.
// Uses local images from /public/images where available,
// with picsum fallbacks so the section always looks populated.
import { Link } from "react-router-dom";

const destinations = [
  {
    name:  "Johannesburg",
    info:  "The City of Gold",
    image: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800&q=80",  // JHB skyline
  },
  {
    name:  "Cape Town",
    info:  "Table Mountain & beaches",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",  // Cape Town
  },
  {
    name:  "Durban",
    info:  "Sun, surf & curry",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80",  // Durban beachfront
  },
  {
    name:  "Pretoria",
    info:  "Jacaranda City",
    image: "https://images.unsplash.com/photo-1648217304059-7f8e8a23f2c2?w=800&q=80",  // Pretoria buildings
  },
];

function InspirationSection() {
  return (
    <section className="inspiration-section" id="inspiration" aria-labelledby="inspiration-heading">
      <h2 id="inspiration-heading">Inspiration for your next trip</h2>
      <div className="card-grid">
        {destinations.map((dest) => (
          <Link
            to={`/locations/${encodeURIComponent(dest.name)}`}
            key={dest.name}
            className="dest-card"
            aria-label={`Explore stays in ${dest.name}`}
          >
            <img
              src={dest.image}
              alt={`${dest.name} landscape`}
            />
            <h3>{dest.name}</h3>
            <p>{dest.info}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default InspirationSection;
