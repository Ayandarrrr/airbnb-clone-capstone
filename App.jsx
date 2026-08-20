// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LocationPage from "./pages/LocationPage";
import LocationDetailsPage from "./pages/LocationDetailsPage";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations/:locationName" element={<LocationPage />} />
        <Route path="/listing/:id" element={<LocationDetailsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;