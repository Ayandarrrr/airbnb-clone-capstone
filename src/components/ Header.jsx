// src/components/Header.jsx
import { Link } from "react-router-dom";

function Header() {
  const isLoggedIn = false; // wire this to real auth state later

  return (
    <header className="site-header">
      <Link to="/" className="logo">airbnb</Link>

      <div className="header-filter">
        <input type="text" placeholder="Search locations" />
      </div>

      <div className="profile-section">
        {isLoggedIn ? (
          <div className="profile-dropdown">
            <button className="profile-btn">👤 Account</button>
            <div className="dropdown-menu">
              <Link to="/reservations">View reservations</Link>
              <button>Log out</button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="become-host">Become a host</Link>
        )}
      </div>
    </header>
  );
}

export default Header;