// src/components/HeroBanner.jsx
// Hero banner with gradient overlay, headline, and a CTA that scrolls
// the user down to the location filter / inspiration section.
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function HeroBanner() {
  const navigate = useNavigate();

  const handleCTA = () => {
    // Navigate to New York as a default starting point,
    // or scroll to the inspiration section if on the home page
    const section = document.getElementById("inspiration");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/locations/New York");
    }
  };

  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(255,56,92,0.85) 0%, rgba(227,28,95,0.80) 50%, rgba(252,100,45,0.85) 100%), url('/images/trip-activity.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content">
        <h1>Not sure where to go? Perfect.</h1>
        <p>Find your next stay — from beachside villas to city apartments.</p>
        <button className="cta-btn" onClick={handleCTA}>
          Start exploring
        </button>
      </div>
    </section>
  );
}

export default HeroBanner;
