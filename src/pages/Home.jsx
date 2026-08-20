// src/pages/Home.jsx
import HeroBanner from "../components/HeroBanner";
import InspirationSection from "../components/InspirationSection";
import ExperiencesSection from "../components/ExperiencesSection";
import ShopAirbnbSection from "../components/ShopAirbnbSection";
import GetawaysSection from "../components/GetawaysSection";

function Home() {
  return (
    <main>
      <HeroBanner />
      <InspirationSection />
      <ExperiencesSection />
      <ShopAirbnbSection />
      <GetawaysSection />
    </main>
  );
}

export default Home;