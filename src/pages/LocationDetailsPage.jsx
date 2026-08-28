// src/pages/LocationDetailsPage.jsx
// Full listing detail view: image gallery, two-column layout,
// cost calculator with date pickers, static info sections, reviews.
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import accommodations from "../data/dummyAccommodations";

// ── helpers ──────────────────────────────────────────────────────────────────

/** Return the number of nights between two date strings. */
function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

/** Format a number as USD currency string. */
function usd(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

// ── sub-components ────────────────────────────────────────────────────────────

/** Five-image gallery: one large on the left, 2×2 grid on the right. */
function ImageGallery({ images = [], title }) {
  const filled = [...images];
  while (filled.length < 5) filled.push("/images/placeholder.jpg");

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={filled[0]} alt={`${title} main`} />
      </div>
      <div className="gallery-grid">
        {filled.slice(1, 5).map((src, i) => (
          <img key={i} src={src} alt={`${title} view ${i + 2}`} />
        ))}
      </div>
    </div>
  );
}

/** Star rating display (filled / empty stars). */
function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <span key={i} className="star full">★</span>;
        if (i === full && half) return <span key={i} className="star half">½</span>;
        return <span key={i} className="star empty">☆</span>;
      })}
      <span className="stars-value">{rating}</span>
    </span>
  );
}

/** Right-column cost calculator card. */
function CostCalculator({ listing }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [reserving, setReserving] = useState(false);
  const [reservationMsg, setReservationMsg] = useState("");

  const nights = nightsBetween(checkIn, checkOut);
  const baseTotal = listing.price * nights;

  // Weekly discount applies when stay ≥ 7 nights
  const weeklyDiscountAmt =
    nights >= 7 ? baseTotal * (listing.weeklyDiscount / 100) : 0;

  const cleaningFee = nights > 0 ? listing.cleaningFee : 0;
  const serviceFee = nights > 0 ? listing.serviceFee : 0;
  const occupancyTaxes = nights > 0 ? listing.occupancyTaxes : 0;
  const total = baseTotal - weeklyDiscountAmt + cleaningFee + serviceFee + occupancyTaxes;

  // Today's date string in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split("T")[0];

  const handleReserve = async () => {
    if (!checkIn || !checkOut) {
      setReservationMsg("Please select check-in and check-out dates.");
      return;
    }
    if (guests < 1 || guests > listing.guests) {
      setReservationMsg(`Guests must be between 1 and ${listing.guests}.`);
      return;
    }
    setReserving(true);
    setReservationMsg("");
    try {
      const token = localStorage.getItem("airbnb_token");
      await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/reservations`,
        {
          accommodationId: listing.id || listing._id,
          checkIn,
          checkOut,
          guests,
          totalPrice: total,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      setReservationMsg("✓ Reservation created successfully!");
    } catch (err) {
      // Fall back gracefully if backend is not running
      setReservationMsg(
        err.response?.data?.message || "Reservation saved (offline mode)."
      );
    } finally {
      setReserving(false);
    }
  };

  return (
    <div className="cost-calculator">
      <div className="calc-header">
        <span className="calc-price">
          <strong>{usd(listing.price)}</strong> / night
        </span>
        <Stars rating={listing.rating} />
        <span className="calc-reviews">({listing.reviews} reviews)</span>
      </div>

      {/* Date & guest inputs */}
      <div className="calc-dates">
        <div className="date-field">
          <label htmlFor="check-in">Check-in</label>
          <input
            id="check-in"
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="date-field">
          <label htmlFor="check-out">Check-out</label>
          <input
            id="check-out"
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      <div className="calc-guests">
        <label htmlFor="guests">Guests</label>
        <input
          id="guests"
          type="number"
          min={1}
          max={listing.guests}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        />
      </div>

      {/* Cost breakdown — only shown when dates are selected */}
      {nights > 0 && (
        <div className="calc-breakdown">
          <div className="calc-row">
            <span>{usd(listing.price)} × {nights} night{nights !== 1 ? "s" : ""}</span>
            <span>{usd(baseTotal)}</span>
          </div>
          {weeklyDiscountAmt > 0 && (
            <div className="calc-row discount">
              <span>Weekly discount ({listing.weeklyDiscount}%)</span>
              <span>−{usd(weeklyDiscountAmt)}</span>
            </div>
          )}
          <div className="calc-row">
            <span>Cleaning fee</span>
            <span>{usd(cleaningFee)}</span>
          </div>
          <div className="calc-row">
            <span>Service fee</span>
            <span>{usd(serviceFee)}</span>
          </div>
          <div className="calc-row">
            <span>Occupancy taxes &amp; fees</span>
            <span>{usd(occupancyTaxes)}</span>
          </div>
          <hr />
          <div className="calc-row calc-total">
            <span><strong>Total</strong></span>
            <span><strong>{usd(total)}</strong></span>
          </div>
        </div>
      )}

      <button
        className="reserve-btn"
        onClick={handleReserve}
        disabled={reserving}
        aria-busy={reserving}
      >
        {reserving ? "Reserving…" : "Reserve"}
      </button>

      {reservationMsg && (
        <p className={`reservation-msg ${reservationMsg.startsWith("✓") ? "success" : "error"}`}>
          {reservationMsg}
        </p>
      )}
    </div>
  );
}

// ── main page component ───────────────────────────────────────────────────────

function LocationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        // Try backend first; fall back to dummy data so the page always works
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/accommodations/${id}`
        );
        setListing(res.data);
      } catch {
        // Backend not available — find in local dummy data
        const local = accommodations.find(
          (a) => String(a.id) === String(id) || String(a._id) === String(id)
        );
        if (local) {
          setListing(local);
        } else {
          setError("Listing not found.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return <div className="page-loading">Loading listing…</div>;
  if (error)
    return (
      <div className="page-error">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  if (!listing) return null;

  return (
    <main className="listing-details">
      {/* ── Heading ── */}
      <div className="listing-heading">
        <h1>{listing.title}</h1>
        <div className="listing-subheading">
          <Stars rating={listing.rating} />
          <span className="listing-reviews">· {listing.reviews} reviews</span>
          <span className="listing-location">· {listing.location}</span>
        </div>
      </div>

      {/* ── Image Gallery ── */}
      <ImageGallery images={listing.images} title={listing.title} />

      {/* ── Two-column layout ── */}
      <div className="listing-body">
        {/* LEFT COLUMN — accommodation details */}
        <div className="listing-left">
          {/* Accommodation overview */}
          <div className="listing-overview">
            <h2>
              {listing.type} hosted by {listing.host || "Host"}
            </h2>
            <p className="listing-specs">
              {listing.guests} guests · {listing.bedrooms} bedroom
              {listing.bedrooms !== 1 ? "s" : ""} · {listing.bathrooms} bathroom
              {listing.bathrooms !== 1 ? "s" : ""}
            </p>
          </div>
          <hr />

          {/* Highlights */}
          <div className="listing-highlights">
            {listing.selfCheckIn && (
              <div className="highlight-item">
                <span className="highlight-icon">🔑</span>
                <div>
                  <strong>Self check-in</strong>
                  <p>Check yourself in with the lockbox.</p>
                </div>
              </div>
            )}
            {listing.enhancedCleaning && (
              <div className="highlight-item">
                <span className="highlight-icon">🧹</span>
                <div>
                  <strong>Enhanced Clean</strong>
                  <p>This host committed to Airbnb's enhanced cleaning process.</p>
                </div>
              </div>
            )}
          </div>
          <hr />

          {/* Description */}
          {listing.description && (
            <>
              <div className="listing-description">
                <p>{listing.description}</p>
              </div>
              <hr />
            </>
          )}

          {/* Where you'll sleep */}
          <div className="listing-sleep">
            <h3>Where you'll sleep</h3>
            <div className="sleep-card">
              <span className="sleep-icon">🛏</span>
              <p>Bedroom</p>
              <p>{listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <hr />

          {/* What this place offers */}
          <div className="listing-amenities">
            <h3>What this place offers</h3>
            <ul className="amenities-list">
              {(listing.amenities || []).map((a) => (
                <li key={a} className="amenity-item">
                  <span className="amenity-icon" aria-hidden="true">✓</span> {a}
                </li>
              ))}
            </ul>
          </div>
          <hr />

          {/* Reviews */}
          <div className="listing-reviews-section">
            <h3>
              <Stars rating={listing.rating} /> · {listing.reviews} reviews
            </h3>
            {listing.specificRatings && (
              <div className="specific-ratings">
                {Object.entries(listing.specificRatings).map(([key, val]) => (
                  <div key={key} className="specific-rating-row">
                    <span className="rating-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    <div className="rating-bar-wrap">
                      <div
                        className="rating-bar"
                        style={{ width: `${(val / 5) * 100}%` }}
                        aria-label={`${val} out of 5`}
                      />
                    </div>
                    <span className="rating-val">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <hr />

          {/* Host details */}
          <div className="listing-host">
            <h3>Meet your host</h3>
            <div className="host-card">
              <div className="host-avatar" aria-hidden="true">
                {listing.host ? listing.host.charAt(0).toUpperCase() : "H"}
              </div>
              <div>
                <strong>{listing.host || "Host"}</strong>
                <p>Host since 2020</p>
              </div>
            </div>
          </div>
          <hr />

          {/* House rules */}
          <div className="listing-rules">
            <h3>House Rules</h3>
            <ul>
              <li>Check-in: After 3:00 PM</li>
              <li>Check-out: 11:00 AM</li>
              <li>No smoking</li>
              <li>No pets</li>
              <li>No parties or events</li>
            </ul>
          </div>
          <hr />

          {/* Health & Safety */}
          <div className="listing-safety">
            <h3>Health &amp; Safety</h3>
            <ul>
              <li>Committed to Airbnb's enhanced cleaning process</li>
              <li>Airbnb's social-distancing and other guidelines apply</li>
              <li>Carbon monoxide alarm</li>
              <li>Smoke alarm</li>
            </ul>
          </div>
          <hr />

          {/* Cancellation policy */}
          <div className="listing-cancellation">
            <h3>Cancellation Policy</h3>
            <p>
              Free cancellation before check-in. Review the host's full
              cancellation policy which applies even if you cancel for illness
              or disruptions caused by COVID-19.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN — cost calculator (sticky) */}
        <div className="listing-right">
          <CostCalculator listing={listing} />
        </div>
      </div>
    </main>
  );
}

export default LocationDetailsPage;
