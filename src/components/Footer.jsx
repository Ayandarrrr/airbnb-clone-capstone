// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-columns">
        <div>
          <h4>Support</h4>
          <ul><li>Help Centre</li><li>Safety information</li><li>Cancellation options</li></ul>
        </div>
        <div>
          <h4>Community</h4>
          <ul><li>Diversity & belonging</li><li>Accessibility</li><li>Tina Stays associates</li></ul>
        </div>
        <div>
          <h4>Hosting</h4>
          <ul><li>Try hosting</li><li>Protection for hosts</li><li>Explore hosting resources</li></ul>
        </div>
        <div>
          <h4>Tina Stays</h4>
          <ul><li>Newsroom</li><li>New features</li><li>Careers</li></ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Tina Stays, Inc.</span>
        <div className="footer-selectors">
          <select><option>English (US)</option></select>
          <select><option>ZAR R</option></select>
        </div>
      </div>
    </footer>
  );
}

export default Footer;