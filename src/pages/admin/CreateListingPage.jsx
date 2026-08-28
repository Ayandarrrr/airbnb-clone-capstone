// src/pages/admin/CreateListingPage.jsx
// Form to create a new property listing.
// Fields: title, location, description, bedrooms, bathrooms, guests, type,
//         price, amenities, images, weeklyDiscount, cleaningFee,
//         serviceFee, occupancyTaxes.
// Includes robust validation, image preview, and POST to backend API.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "./AdminLayout";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// All amenity options shown as checkboxes
const AMENITY_OPTIONS = [
  "Wifi", "Kitchen", "Free parking", "Air conditioning", "Washer",
  "Dryer", "Pool", "Hot tub", "Gym", "Balcony",
  "Ocean view", "BBQ grill", "Garden", "Fireplace", "Elevator",
];

// Property types
const PROPERTY_TYPES = [
  "Entire apartment", "Entire house", "Entire villa", "Entire loft",
  "Private room", "Shared room", "Cabin", "Cottage", "Studio",
];

// Default blank form state
const EMPTY_FORM = {
  title: "",
  location: "",
  description: "",
  type: "",
  bedrooms: "",
  bathrooms: "",
  guests: "",
  price: "",
  weeklyDiscount: "0",
  cleaningFee: "0",
  serviceFee: "0",
  occupancyTaxes: "0",
  amenities: [],
  images: [],       // URL strings entered manually or uploaded
};

// ── Validation ────────────────────────────────────────────
function validateForm(form) {
  const errs = {};
  if (!form.title.trim())       errs.title       = "Title is required.";
  if (!form.location.trim())    errs.location    = "Location is required.";
  if (!form.description.trim()) errs.description = "Description is required.";
  if (!form.type)               errs.type        = "Property type is required.";
  if (!form.bedrooms || Number(form.bedrooms) < 0)
    errs.bedrooms = "Enter a valid number of bedrooms.";
  if (!form.bathrooms || Number(form.bathrooms) < 0)
    errs.bathrooms = "Enter a valid number of bathrooms.";
  if (!form.guests || Number(form.guests) < 1)
    errs.guests = "Enter a valid guest count (≥ 1).";
  if (!form.price || Number(form.price) <= 0)
    errs.price = "Price per night must be greater than 0.";
  if (Number(form.weeklyDiscount) < 0 || Number(form.weeklyDiscount) > 100)
    errs.weeklyDiscount = "Weekly discount must be between 0 and 100.";
  if (Number(form.cleaningFee) < 0)  errs.cleaningFee  = "Cleaning fee cannot be negative.";
  if (Number(form.serviceFee) < 0)   errs.serviceFee   = "Service fee cannot be negative.";
  if (Number(form.occupancyTaxes) < 0) errs.occupancyTaxes = "Taxes cannot be negative.";
  return errs;
}

// ── Field component (keeps JSX DRY) ──────────────────────
function Field({ id, label, error, children }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="field-error" role="alert">{error}</span>}
    </div>
  );
}

function CreateListingPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  // Generic text/number/select handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  // Amenity checkbox toggle
  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Add image URL to list
  const addImageUrl = () => {
    const url = imageUrlInput.trim();
    if (!url) return;
    setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
    setImageUrlInput("");
  };

  // Remove image by index
  const removeImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  // File upload — convert to object URL for preview; send URL or handle
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Scroll to top of form to show errors
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setServerError("");
    setSuccess("");

    // Build payload matching the backend schema
    const payload = {
      title:           form.title.trim(),
      location:        form.location.trim(),
      description:     form.description.trim(),
      type:            form.type,
      bedrooms:        Number(form.bedrooms),
      bathrooms:       Number(form.bathrooms),
      guests:          Number(form.guests),
      price:           Number(form.price),
      weeklyDiscount:  Number(form.weeklyDiscount),
      cleaningFee:     Number(form.cleaningFee),
      serviceFee:      Number(form.serviceFee),
      occupancyTaxes:  Number(form.occupancyTaxes),
      amenities:       form.amenities,
      images:          form.images.length ? form.images : ["/images/placeholder.jpg"],
    };

    try {
      await axios.post(`${API}/api/accommodations`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Listing created successfully!");
      setForm(EMPTY_FORM);
      setImageUrlInput("");
      // Navigate to listings after short delay
      setTimeout(() => navigate("/admin/listings"), 1500);
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Failed to create listing. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-form-page">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Create Listing</h1>
            <p className="admin-page-subtitle">Add a new property to the platform.</p>
          </div>
        </div>

        {success && <div className="form-success">{success}</div>}
        {serverError && <div className="form-error" role="alert">{serverError}</div>}

        <form className="admin-form" onSubmit={handleSubmit} noValidate>

          {/* ── Basic info ── */}
          <Field id="title" label="Title *" error={errors.title}>
            <input id="title" name="title" value={form.title} onChange={handleChange}
              placeholder="e.g. Modern Apartment in New York"
              className={errors.title ? "input-error" : ""} />
          </Field>

          <div className="form-row">
            <Field id="location" label="Location *" error={errors.location}>
              <input id="location" name="location" value={form.location} onChange={handleChange}
                placeholder="e.g. New York"
                className={errors.location ? "input-error" : ""} />
            </Field>

            <Field id="type" label="Property Type *" error={errors.type}>
              <select id="type" name="type" value={form.type} onChange={handleChange}
                className={errors.type ? "input-error" : ""}>
                <option value="">Select type…</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="description" label="Description *" error={errors.description}>
            <textarea id="description" name="description" value={form.description}
              onChange={handleChange} rows={4}
              placeholder="Describe the property, neighbourhood, and unique features…"
              className={errors.description ? "input-error" : ""} />
          </Field>

          {/* ── Capacity ── */}
          <div className="form-row">
            <Field id="bedrooms" label="Bedrooms *" error={errors.bedrooms}>
              <input id="bedrooms" name="bedrooms" type="number" min="0" value={form.bedrooms}
                onChange={handleChange} className={errors.bedrooms ? "input-error" : ""} />
            </Field>
            <Field id="bathrooms" label="Bathrooms *" error={errors.bathrooms}>
              <input id="bathrooms" name="bathrooms" type="number" min="0" value={form.bathrooms}
                onChange={handleChange} className={errors.bathrooms ? "input-error" : ""} />
            </Field>
          </div>

          <div className="form-row">
            <Field id="guests" label="Max Guests *" error={errors.guests}>
              <input id="guests" name="guests" type="number" min="1" value={form.guests}
                onChange={handleChange} className={errors.guests ? "input-error" : ""} />
            </Field>
            <Field id="price" label="Price per Night ($) *" error={errors.price}>
              <input id="price" name="price" type="number" min="0" step="0.01" value={form.price}
                onChange={handleChange} className={errors.price ? "input-error" : ""} />
            </Field>
          </div>

          {/* ── Fees ── */}
          <div className="form-row">
            <Field id="weeklyDiscount" label="Weekly Discount (%)" error={errors.weeklyDiscount}>
              <input id="weeklyDiscount" name="weeklyDiscount" type="number" min="0" max="100"
                value={form.weeklyDiscount} onChange={handleChange}
                className={errors.weeklyDiscount ? "input-error" : ""} />
            </Field>
            <Field id="cleaningFee" label="Cleaning Fee ($)" error={errors.cleaningFee}>
              <input id="cleaningFee" name="cleaningFee" type="number" min="0" step="0.01"
                value={form.cleaningFee} onChange={handleChange}
                className={errors.cleaningFee ? "input-error" : ""} />
            </Field>
          </div>

          <div className="form-row">
            <Field id="serviceFee" label="Service Fee ($)" error={errors.serviceFee}>
              <input id="serviceFee" name="serviceFee" type="number" min="0" step="0.01"
                value={form.serviceFee} onChange={handleChange}
                className={errors.serviceFee ? "input-error" : ""} />
            </Field>
            <Field id="occupancyTaxes" label="Occupancy Taxes ($)" error={errors.occupancyTaxes}>
              <input id="occupancyTaxes" name="occupancyTaxes" type="number" min="0" step="0.01"
                value={form.occupancyTaxes} onChange={handleChange}
                className={errors.occupancyTaxes ? "input-error" : ""} />
            </Field>
          </div>

          {/* ── Amenities ── */}
          <div className="form-group">
            <label>Amenities</label>
            <div className="amenities-grid">
              {AMENITY_OPTIONS.map((a) => (
                <label key={a} className="amenity-check">
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(a)}
                    onChange={() => toggleAmenity(a)}
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>

          {/* ── Images ── */}
          <div className="form-group">
            <label>Images</label>
            {/* File upload */}
            <input
              type="file" accept="image/*" multiple
              onChange={handleFileUpload}
              style={{ marginBottom: 10 }}
              aria-label="Upload image files"
            />
            {/* OR paste URL */}
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input
                type="url" value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Or paste image URL and click Add"
                style={{ flex: 1 }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImageUrl(); } }}
              />
              <button type="button" className="btn-secondary" onClick={addImageUrl}>
                Add
              </button>
            </div>

            {/* Preview thumbnails */}
            {form.images.length > 0 && (
              <div className="image-preview">
                {form.images.map((src, i) => (
                  <div key={i} className="image-thumb">
                    <img src={src} alt={`Preview ${i + 1}`} />
                    <button
                      type="button"
                      className="image-thumb-remove"
                      onClick={() => removeImage(i)}
                      aria-label={`Remove image ${i + 1}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Actions ── */}
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate("/admin/listings")}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading} aria-busy={loading}>
              {loading ? "Creating…" : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateListingPage;
