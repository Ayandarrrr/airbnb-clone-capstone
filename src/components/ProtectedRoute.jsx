// src/components/ProtectedRoute.jsx
// Redirects unauthenticated users away from protected admin pages.
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wrap admin routes with this component.
 * If the user is not logged in they are redirected to /login,
 * and the original URL is saved so they can be sent back after login.
 */
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
