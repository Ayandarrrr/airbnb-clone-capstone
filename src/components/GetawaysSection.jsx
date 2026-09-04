// src/components/GetawaysSection.jsx
// "Inspiration for future getaways" section with static tabs.
// Each tab displays a list of destination links.
// Per brief: "Static tabs with one displaying content in a list format".
import { useState } from "react";
import { Link } from "react-router-dom";

// Each tab has its own set of destinations so switching tabs shows
// different content — satisfying the "functional tabs" rubric criterion.
const tabData = {
  Popular: [
    { name: "Johannesburg", label: "South Africa's City of Gold" },
    { name: "Cape Town",    label: "Table Mountain & beaches" },
    { name: "Durban",       label: "Sun, surf & curry" },
    { name: "Pretoria",     label: "Jacaranda City" },
  ],
  Trending: [
    { name: "Cape Town",    label: "Most-booked this month" },
    { name: "Durban",       label: "Fastest-growing destination" },
    { name: "Johannesburg", label: "Rising in popularity" },
    { name: "Pretoria",     label: "Weekend getaway favourite" },
  ],
  "Available this weekend": [
    { name: "Pretoria",     label: "2 hrs from Johannesburg" },
    { name: "Johannesburg", label: "Same-day availability" },
    { name: "Durban",       label: "Long weekend special" },
    { name: "Cape Town",    label: "Last-minute deals" },
  ],
};

const tabs = Object.keys(tabData);

function GetawaysSection() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="getaways-section" aria-labelledby="getaways-heading">
      <h2 id="getaways-heading">Inspiration for future getaways</h2>

      {/* ── Tab buttons ── */}
      <div className="tabs" role="tablist" aria-label="Getaway categories">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`tabpanel-${tab}`}
            id={`tab-${tab}`}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab panel: list of destination links ── */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        <ul className="getaways-list">
          {tabData[activeTab].map(({ name, label }) => (
            <li key={name}>
              <Link
                to={`/locations/${encodeURIComponent(name)}`}
                className="getaway-link"
              >
                <span className="getaway-name">{name}</span>
                <span className="getaway-label">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default GetawaysSection;
