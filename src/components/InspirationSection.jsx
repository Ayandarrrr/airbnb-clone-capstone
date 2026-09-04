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
    image: "/images/new-york.jpg",   // closest available local image
  },
  {
    name:  "Cape Town",
    info:  "Table Mountain & beaches",
    image: "/images/cape-town.jpg",
  },
  {
    name:  "Durban",
    info:  "Sun, surf & curry",
    image: "/images/bali.jpg",
  },
  {
    name:  "Pretoria",
    info:  "Jacaranda City",
    image: "/images/paris.jpg",
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
              onError={(e) => {
                // Graceful image fallback if local file is missing
                e.target.src = `https://picsum.photos/seed/${dest.name}/800/600`;
              }}
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
