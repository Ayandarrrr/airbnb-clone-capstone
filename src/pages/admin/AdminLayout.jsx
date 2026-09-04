// src/pages/admin/AdminLayout.jsx
// Shared sidebar + main-content shell used by all admin pages.
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin",           label: "Dashboard",       icon: "H", end: true },
  { to: "/admin/listings",  label: "View Listings",   icon: "L" },
  { to: "/reservations",   label: "Reservations",    icon: "R" },
  { to: "/admin/create",    label: "Create Listing",  icon: "+" },
];

function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="admin-layout">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <h2>Admin</h2>
        <nav className="sidebar-nav">
          {navItems.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                "sidebar-link" + (isActive ? " active" : "")
              }
            >
              <span className="sidebar-icon" aria-hidden="true">{icon}</span>
              {label}
            </NavLink>
          ))}
          <button
            className="sidebar-link"
            onClick={handleLogout}
            style={{ width: "100%", textAlign: "left" }}
          >
            <span className="sidebar-icon" aria-hidden="true">x</span>
            Log out
          </button>
        </nav>

        {/* Logged-in user info at bottom */}
        {user && (
          <div style={{
            padding: "20px 24px", marginTop: "auto",
            borderTop: "1px solid #ddd", fontSize: "0.82rem", color: "#717171"
          }}>
            <div style={{ fontWeight: 600, color: "#222", marginBottom: 2 }}>
              {user.username}
            </div>
            <div style={{ textTransform: "capitalize" }}>{user.role}</div>
          </div>
        )}
      </aside>

      {/* ── Main content ── */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
