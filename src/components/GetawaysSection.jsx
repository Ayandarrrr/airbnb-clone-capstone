// src/components/GetawaysSection.jsx
import { useState } from "react";

const tabs = ["Popular", "Trending", "Available this weekend"];
const listItems = ["New York", "Cape Town", "Bali", "Lisbon", "Tokyo"];

function GetawaysSection() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="getaways-section">
      <h2>Inspiration for future getaways</h2>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <ul className="getaways-list">
        {listItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default GetawaysSection;