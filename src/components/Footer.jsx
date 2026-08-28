// src/components/Footer.jsx
// Static footer: 4-column links, social icons, language + currency selectors.
function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: "Support",
      links: ["Help Centre", "Safety information", "Cancellation options", "Report a concern"],
    },
    {
      heading: "Community",
      links: ["Diversity & belonging", "Accessibility", "Airbnb associates", "Frontline stays"],
    },
    {
      heading: "Hosting",
      links: ["Try hosting", "Protection for hosts", "Explore hosting resources", "Community forum"],
    },
    {
      heading: "Airbnb",
      links: ["Newsroom", "New features", "Careers", "Investors"],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-columns">
        {columns.map(({ heading, links }) => (
          <div key={heading}>
            <h4>{heading}</h4>
            <ul>
              {links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© {year} Airbnb Clone, Inc. · Privacy · Terms · Sitemap</span>

        {/* Social links */}
        <div className="footer-social" aria-label="Social media links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter / X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
        </div>

        <div className="footer-selectors">
          <select aria-label="Language">
            <option>English (US)</option>
            <option>Français</option>
            <option>Español</option>
          </select>
          <select aria-label="Currency">
            <option>USD $</option>
            <option>EUR €</option>
            <option>GBP £</option>
            <option>ZAR R</option>
          </select>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
