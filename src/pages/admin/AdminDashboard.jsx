// src/pages/admin/AdminDashboard.jsx
// Overview landing page for the admin area.
// Shows stat cards and quick-navigation links.
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "./AdminLayout";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function AdminDashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({ listings: 0, reservations: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch live counts from backend; gracefully show 0 if backend is offline
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const [listRes, resRes] = await Promise.allSettled([
          axios.get(`${API}/api/accommodations`, { headers }),
          axios.get(`${API}/api/reservations/host`, { headers }),
        ]);

        setStats({
          listings:
            listRes.status === "fulfilled"
              ? (listRes.value.data?.length ?? 0)
              : 0,
          reservations:
            resRes.status === "fulfilled"
              ? (resRes.value.data?.length ?? 0)
              : 0,
        });
      } catch {
        // Backend offline — stats stay at 0
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <AdminLayout>
      <h1 className="admin-page-title">
        Welcome back, {user?.username} 👋
      </h1>
      <p className="admin-page-subtitle">
        Manage your property listings and reservations from here.
      </p>

      {/* ── Stat cards ── */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-label">Total Listings</div>
          <div className="stat-value">{loading ? "…" : stats.listings}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-label">Reservations</div>
          <div className="stat-value">{loading ? "…" : stats.reservations}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-label">Role</div>
          <div className="stat-value" style={{ fontSize: "1.2rem", textTransform: "capitalize" }}>
            {user?.role || "—"}
          </div>
        </div>
      </div>

      {/* ── Quick links ── */}
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16 }}>
        Quick actions
      </h2>
      <div className="admin-quick-links">
        <Link to="/admin/create" className="quick-link-btn primary">
          + Create new listing
        </Link>
        <Link to="/admin/listings" className="quick-link-btn secondary">
          View all listings
        </Link>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
