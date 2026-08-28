// src/context/AuthContext.jsx
// Provides JWT-based authentication state across the entire app.
// Stores the token in localStorage so sessions persist on refresh.
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role, id }
  const [token, setToken] = useState(null);

  // On mount, restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("airbnb_token");
    if (stored) {
      try {
        const decoded = jwtDecode(stored);
        // Check token hasn't expired
        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          setToken(stored);
          setUser({ username: decoded.username, role: decoded.role, id: decoded.id });
        } else {
          localStorage.removeItem("airbnb_token");
        }
      } catch {
        localStorage.removeItem("airbnb_token");
      }
    }
  }, []);

  /**
   * Call after a successful login API response.
   * @param {string} jwt - The JWT string returned by the server.
   */
  const login = (jwt) => {
    try {
      const decoded = jwtDecode(jwt);
      localStorage.setItem("airbnb_token", jwt);
      setToken(jwt);
      setUser({ username: decoded.username, role: decoded.role, id: decoded.id });
    } catch {
      console.error("Invalid token received during login.");
    }
  };

  /** Clear session state and remove persisted token. */
  const logout = () => {
    localStorage.removeItem("airbnb_token");
    setToken(null);
    setUser(null);
  };

  const isLoggedIn = Boolean(user);
  const isAdmin = user?.role === "admin" || user?.role === "host";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Convenience hook — use this instead of useContext(AuthContext) directly. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export default AuthContext;
