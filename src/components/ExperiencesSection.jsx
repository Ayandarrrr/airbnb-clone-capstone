// src/components/ExperiencesSection.jsx
// "Discover Airbnb Experiences" section — two cards with background images.
function ExperiencesSection() {
  const cards = [
    {
      title: "Things to do on your trip",
      btn: "Explore experiences",
      img: "https://picsum.photos/seed/trip-activity/800/600",
    },
    {
      title: "Things to do at home",
      btn: "Explore online experiences",
      img: "https://picsum.photos/seed/home-activity/800/600",
    },
  ];

  return (
    <section className="experiences-section">
      <h2>Discover Airbnb Experiences</h2>
      <div className="experiences-grid">
        {cards.map(({ title, btn, img }) => (
          <div
            key={title}
            className="experience-card"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3>{title}</h3>
            <button>{btn}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperiencesSection;