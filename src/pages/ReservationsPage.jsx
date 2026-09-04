// src/pages/ReservationsPage.jsx
// Displays all reservations for the currently logged-in user in a table.
// Fetches from backend; gracefully shows a message if backend is offline.
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

/** Format a date string to a readable DD Mon YYYY string. */
function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Return the number of nights between two ISO date strings. */
function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

/** Status badge with colour coding. */
function StatusBadge({ status }) {
  const colours = {
    confirmed:  { background: "#e8f8f5", color: "#1a7a5a" },
    pending:    { background: "#fff8e1", color: "#b07800" },
    cancelled:  { background: "#fde8ec", color: "#c0392b" },
  };
  const style = colours[status] || colours.confirmed;
  return (
    <span
      style={{
        ...style,
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "0.8rem",
        fontWeight: 600,
        textTransform: "capitalize",
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
}

function ReservationsPage() {
  const { token, user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [cancelId, setCancelId]         = useState(null);
  const [cancelling, setCancelling]     = useState(false);
  const [feedback, setFeedback]         = useState("");

  // ── Fetch reservations ──────────────────────────────────
  const fetchReservations = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // Hosts/admins see all reservations for their properties;
      // regular users see their own bookings.
      const endpoint =
        user?.role === "admin" || user?.role === "host"
          ? `${API}/api/reservations/host`
          : `${API}/api/reservations/user`;

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        setError(
          "Could not load reservations — the backend may be offline. " +
          "Start the server and refresh to see live data."
        );
      }
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // ── Cancel a reservation ────────────────────────────────
  const handleCancel = async () => {
    if (!cancelId) return;
    setCancelling(true);
    setFeedback("");
    try {
      await axios.delete(`${API}/api/reservations/${cancelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations((prev) =>
        prev.filter((r) => String(r._id) !== String(cancelId))
      );
      setFeedback("Reservation cancelled successfully.");
    } catch (err) {
      setFeedback(
        err.response?.data?.message || "Failed to cancel reservation."
      );
    } finally {
      setCancelling(false);
      setCancelId(null);
    }
  };

  // ── Render ──────────────────────────────────────────────
  return (
    <main className="reservations-page">
      <div className="reservations-header">
        <div>
          <h1>My Reservations</h1>
          <p className="reservations-subtitle">
            {user?.role === "host" || user?.role === "admin"
              ? "Reservations made at your properties."
              : "Your upcoming and past bookings."}
          </p>
        </div>
        <Link to="/" className="btn-secondary" style={{ alignSelf: "flex-start" }}>
          ← Back to Home
        </Link>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={feedback.includes("success") ? "form-success" : "form-error"}
          role="status"
          style={{ marginBottom: 20 }}
        >
          {feedback}
        </div>
      )}

      {/* Cancel confirmation modal */}
      {cancelId && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h2>Cancel Reservation?</h2>
            <p style={{ color: "#717171", marginBottom: 20 }}>
              This will permanently cancel the reservation and cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button className="btn-secondary" onClick={() => setCancelId(null)}>
                Keep it
              </button>
              <button
                className="btn-primary"
                style={{ background: "#c0392b" }}
                onClick={handleCancel}
                disabled={cancelling}
                aria-busy={cancelling}
              >
                {cancelling ? "Cancelling…" : "Cancel reservation"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && <div className="page-loading">Loading reservations…</div>}

      {/* Error state */}
      {!loading && error && (
        <div className="reservations-empty">
          <span className="reservations-empty-icon">!</span>
          <p>{error}</p>
          <button className="btn-primary" onClick={fetchReservations}>
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && reservations.length === 0 && (
        <div className="reservations-empty">
          <span className="reservations-empty-icon">-</span>
          <p>No reservations found yet.</p>
          <Link to="/" className="btn-primary">
            Explore stays
          </Link>
        </div>
      )}

      {/* Reservations table */}
      {!loading && !error && reservations.length > 0 && (
        <div className="reservations-table-wrap">
          <table className="reservations-table" aria-label="Reservations">
            <thead>
              <tr>
                <th>Property</th>
                <th>Location</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Nights</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => {
                const acc   = r.accommodation || {};
                const img   = acc.images?.[0] || "/images/placeholder.jpg";
                const nights = nightsBetween(r.checkIn, r.checkOut);
                return (
                  <tr key={r._id}>
                    {/* Property thumbnail + title */}
                    <td>
                      <div className="reservation-property-cell">
                        <img
                          src={img}
                          alt={acc.title || "Property"}
                          className="reservation-thumb"
                        />
                        <span className="reservation-title">
                          {acc.title || "—"}
                        </span>
                      </div>
                    </td>
                    <td>{acc.location || "—"}</td>
                    <td>{formatDate(r.checkIn)}</td>
                    <td>{formatDate(r.checkOut)}</td>
                    <td style={{ textAlign: "center" }}>{nights}</td>
                    <td style={{ textAlign: "center" }}>{r.guests}</td>
                    <td>
                      <strong>
                        R{Number(r.totalPrice || 0).toFixed(2)}
                      </strong>
                    </td>
                    <td>
                      <StatusBadge status={r.status || "confirmed"} />
                    </td>
                    <td>
                      {r.status !== "cancelled" && (
                        <button
                          className="btn-danger"
                          onClick={() => {
                            setCancelId(r._id);
                            setFeedback("");
                          }}
                          aria-label={`Cancel reservation at ${acc.title}`}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default ReservationsPage;
