// src/components/ScrollToTop.jsx
// Scrolls the window to the top whenever the route changes.
// Place inside <BrowserRouter> but outside <Routes>.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default ScrollToTop;
