// src/components/ExperiencesSection.jsx
function ExperiencesSection() {
  return (
    <section className="experiences-section">
      <h2>Discover Airbnb Experiences</h2>
      <div className="experiences-grid">
        <div className="experience-card" style={{ backgroundImage: "url(/images/trip-activity.jpg)" }}>
          <h3>Things to do on your trip</h3>
          <button>Explore experiences</button>
        </div>
        <div className="experience-card" style={{ backgroundImage: "url(/images/home-activity.jpg)" }}>
          <h3>Things to do at home</h3>
          <button>Explore online experiences</button>
        </div>
      </div>
    </section>
  );
}

export default ExperiencesSection;