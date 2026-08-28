// src/pages/LoginPage.jsx
// Login page with email + password form, input validation,
// JWT auth via backend API, and redirect to admin dashboard on success.
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination after login (default: /admin)
  const from = location.state?.from?.pathname || "/admin";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, go straight to admin
  if (isLoggedIn) {
    navigate(from, { replace: true });
    return null;
  }

  // ── Validation ────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      errs.password = "Password is required.";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const res = await axios.post(`${API}/api/users/login`, {
        email: form.email,
        password: form.password,
      });
      // Backend returns { token: "..." }
      login(res.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg) {
        setServerError(msg);
      } else {
        setServerError("Unable to connect to server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Header */}
        <h1>Welcome back</h1>
        <p className="login-subtitle">Log in to access the admin dashboard.</p>

        {/* Server-level error */}
        {serverError && (
          <div className="form-error" role="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              aria-describedby={errors.email ? "email-err" : undefined}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && (
              <span id="email-err" className="field-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
              aria-describedby={errors.password ? "pw-err" : undefined}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password && (
              <span id="pw-err" className="field-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p style={{ marginTop: "24px", fontSize: "0.875rem", color: "#717171", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/" style={{ color: "#FF385C", fontWeight: 600 }}>
            Return to home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
