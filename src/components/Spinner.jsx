// src/components/Spinner.jsx
// Reusable loading spinner shown during async operations.
function Spinner({ size = 40, message = "Loading…" }) {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <div
        className="spinner"
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
      <p className="spinner-msg">{message}</p>
    </div>
  );
}

export default Spinner;
