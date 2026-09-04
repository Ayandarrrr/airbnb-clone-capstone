// src/components/HeroBanner.jsx
// Hero banner with gradient overlay, headline, sub-headline, and a clear CTA.
// Per brief: "Hero Banner" with "clear call-to-action".
// The CTA smoothly scrolls to the Inspiration section if on the home page,
// or navigates directly to the Johannesburg listings page otherwise.
import { useNavigate } from "react-router-dom";

function HeroBanner() {
  const navigate = useNavigate();

  const handleCTA = () => {
    const section = document.getElementById("inspiration");
    if (section) {
      // Smooth scroll to inspiration section on home page
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      // From any other page, go straight to listings
      navigate("/locations/Johannesburg");
    }
  };

  return (
    <section
      className="hero-banner"
      aria-label="Hero banner — find your next stay"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(255,56,92,0.85) 0%, rgba(227,28,95,0.80) 50%, rgba(252,100,45,0.85) 100%), url('/images/trip-activity.jpg')",
        backgroundSize:     "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content">
        <h1>Not sure where to go? Perfect.</h1>
        <p>
          Find your next stay — from beachside villas to city apartments.
          Explore thousands of unique homes across South Africa.
        </p>
        <button
          className="cta-btn"
          onClick={handleCTA}
          aria-label="Start exploring stays"
        >
          Start exploring
        </button>
      </div>
    </section>
  );
}

export default HeroBanner;
