// src/pages/NotFoundPage.jsx
// Shown when the user navigates to a route that doesn't exist.
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1>Page not found</h1>
        <p>Sorry, we couldn't find the page you were looking for.</p>
        <Link to="/" className="cta-btn" style={{ display: "inline-block", marginTop: 24 }}>
          Go back home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
