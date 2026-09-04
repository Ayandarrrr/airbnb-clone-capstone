// src/components/ExperiencesSection.jsx
// "Discover Airbnb Experiences" section with two cards.
// Per brief: "Discover Airbnb Experiences" with:
//   - "Things to do on your trip" (static button + background image)
//   - "Things to do at home"       (static button + background image)
// Each card uses a large background image with a dark gradient overlay.
function ExperiencesSection() {
  const cards = [
    {
      title: "Things to do on your trip",
      btn:   "Explore experiences",
      img:   "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", // travel/trip
    },
    {
      title: "Things to do at home",
      btn:   "Explore online experiences",
      img:   "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", // cosy home
    },
  ];

  return (
    <section
      className="experiences-section"
      aria-labelledby="experiences-heading"
    >
      <h2 id="experiences-heading">Discover Airbnb Experiences</h2>
      <div className="experiences-grid">
        {cards.map(({ title, btn, img, fallback }) => (
          <div
            key={title}
            className="experience-card"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize:     "cover",
              backgroundPosition: "center",
            }}
            role="img"
            aria-label={title}
          >
            <h3>{title}</h3>
            <button
              onClick={() => alert(`${title} — coming soon!`)}
              aria-label={btn}
            >
              {btn}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperiencesSection;
