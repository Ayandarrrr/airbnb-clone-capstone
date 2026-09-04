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
      img:   "/images/trip-activity.jpg",
      fallback: "https://picsum.photos/seed/trip-activity/800/600",
    },
    {
      title: "Things to do at home",
      btn:   "Explore online experiences",
      img:   "/images/home-activity.jpg",
      fallback: "https://picsum.photos/seed/home-activity/800/600",
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
              backgroundImage: `url(${img}), url(${fallback})`,
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
