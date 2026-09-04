// src/components/Header.jsx
// Top header: Tina Stays logo, location filter, and profile/auth section.
// Logged-in state: shows greeting, avatar, and dropdown (View Reservations, Admin, Logout).
// Logged-out state: shows "Become a host" and "Log in" links.
// Uses AuthContext so the UI updates automatically on login/logout.
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LocationFilter from "./LocationFilter";

function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate    = useNavigate();

  // Close dropdown when the user clicks anywhere outside it
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  // First letter of username for avatar initial
  const avatarInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "U";

  return (
    <header className="site-header" role="banner">
      {/* ── Logo ── */}
      <Link to="/" className="logo" aria-label="Tina Stays — go to home page">
        <svg viewBox="0 0 32 32" className="logo-icon" aria-hidden="true">
          <path d="M16 1C10.925 1 7 6.375 7 12.5c0 3.675 1.8 7.05 4.675 9.475L16 31l4.325-9.025C23.2 19.55 25 16.175 25 12.5 25 6.375 21.075 1 16 1zm0 16.5c-2.762 0-5-2.238-5-5s2.238-5 5-5 5 2.238 5 5-2.238 5-5 5z" />
        </svg>
        <span className="logo-text">Tina Stays</span>
      </Link>

      {/* ── Location filter (hidden on small screens via CSS) ── */}
      <div className="header-filter" aria-label="Search destinations">
        <LocationFilter />
      </div>

      {/* ── Profile / auth section ── */}
      <nav className="profile-section" aria-label="User account">
        {isLoggedIn ? (
          /* ── LOGGED-IN STATE: greeting + dropdown ── */
          <div className="profile-dropdown" ref={dropdownRef}>
            <button
              className="profile-btn"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              aria-label={`Account menu for ${user.username}`}
            >
              {/* Avatar circle with first-letter initial */}
              <span className="profile-avatar" aria-hidden="true">
                {avatarInitial}
              </span>
              <span className="profile-name">Hi, {user.username}</span>
              <span className="chevron" aria-hidden="true">▾</span>
            </button>

            {/* ── Dropdown menu ── */}
            {dropdownOpen && (
              <div className="dropdown-menu" role="menu" aria-label="Account options">
                <Link
                  to="/reservations"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  View Reservations
                </Link>

                {/* Admin / host: show dashboard link */}
                {(user.role === "admin" || user.role === "host") && (
                  <Link
                    to="/admin"
                    className="dropdown-item"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}

                <hr className="dropdown-divider" />

                <button
                  className="dropdown-item dropdown-logout"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ── LOGGED-OUT STATE: "Become a host" + "Log in" ── */
          <div className="logged-out-actions">
            <Link to="/login" className="become-host-link">
              Become a host
            </Link>
            <Link to="/login" className="login-btn" aria-label="Log in to your account">
              Log in
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
