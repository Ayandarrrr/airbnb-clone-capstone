// src/pages/admin/ViewListingsPage.jsx
// Displays all property listings in a table with edit and delete actions.
// Fetches from backend; falls back to dummyAccommodations when offline.
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "./AdminLayout";
import dummyData from "../../data/dummyAccommodations";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function ViewListingsPage() {
  const { token } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);   // ID pending confirmation
  const [deleting, setDeleting] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState("");

  // ── Fetch listings ────────────────────────────────────────
  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${API}/api/accommodations`, { headers });
      setListings(res.data);
    } catch {
      // Backend not available — use dummy data so the page still works
      setListings(dummyData);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  // ── Delete listing ────────────────────────────────────────
  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteMsg("");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await axios.delete(`${API}/api/accommodations/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings((prev) => prev.filter(
        (l) => String(l._id || l.id) !== String(deleteId)
      ));
      setDeleteMsg("Listing deleted successfully.");
    } catch (err) {
      setDeleteMsg(
        err.response?.data?.message || "Failed to delete listing."
      );
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Listings</h1>
          <p className="admin-page-subtitle">
            {listings.length} propert{listings.length !== 1 ? "ies" : "y"} found.
          </p>
        </div>
        <Link to="/admin/create" className="btn-primary">
          + Create Listing
        </Link>
      </div>

      {/* Feedback messages */}
      {deleteMsg && (
        <div
          className={deleteMsg.includes("successfully") ? "form-success" : "form-error"}
          role="status"
          style={{ marginBottom: 20 }}
        >
          {deleteMsg}
        </div>
      )}
      {error && (
        <div className="form-error" role="alert" style={{ marginBottom: 20 }}>
          {error}
        </div>
      )}

      {/* ── Delete confirmation modal ── */}
      {deleteId && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Confirm delete">
          <div className="modal-card">
            <h2>Delete Listing?</h2>
            <p style={{ color: "#717171", marginBottom: 20 }}>
              This action cannot be undone. The listing will be permanently removed.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="btn-primary" style={{ background: "#c0392b" }}
                onClick={handleDelete} disabled={deleting} aria-busy={deleting}>
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      {loading ? (
        <div className="page-loading">Loading listings…</div>
      ) : listings.length === 0 ? (
        <div className="listings-table-wrap">
          <div className="empty-state">
            <p>No listings yet.</p>
            <Link to="/admin/create" className="btn-primary">
              Create your first listing
            </Link>
          </div>
        </div>
      ) : (
        <div className="listings-table-wrap">
          <table className="listings-table" aria-label="Property listings">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Price/night</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => {
                const id = listing._id || listing.id;
                const mainImage =
                  listing.images?.[0] || "/images/placeholder.jpg";
                return (
                  <tr key={id}>
                    <td>
                      <img
                        src={mainImage}
                        alt={listing.title}
                        className="listing-thumb"
                      />
                    </td>
                    <td className="listing-title-cell">{listing.title}</td>
                    <td>{listing.location}</td>
                    <td>{listing.type}</td>
                    <td><strong>${listing.price}</strong></td>
                    <td>
                      <div className="listing-actions">
                        <Link
                          to={`/admin/edit/${id}`}
                          className="btn-edit"
                          aria-label={`Edit ${listing.title}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn-danger"
                          onClick={() => confirmDelete(id)}
                          aria-label={`Delete ${listing.title}`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

export default ViewListingsPage;
