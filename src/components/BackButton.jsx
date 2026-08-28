// src/components/BackButton.jsx
// Reusable back-navigation button using browser history.
import { useNavigate } from "react-router-dom";

function BackButton({ label = "← Back" }) {
  const navigate = useNavigate();
  return (
    <button
      className="back-btn"
      onClick={() => navigate(-1)}
      aria-label="Go back to previous page"
    >
      {label}
    </button>
  );
}

export default BackButton;
