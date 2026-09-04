// src/components/ShopAirbnbSection.jsx
// "Shop Tina Stays gift cards" section.
// Per brief: "Two columns: title and button on one side, image of gift cards on the other".
// Left column: heading + descriptive text + CTA button.
// Right column: gift card image.
function ShopAirbnbSection() {
  return (
    <section className="shop-airbnb-section" aria-labelledby="shop-heading">
      {/* ── Left: text + CTA ── */}
      <div className="shop-text">
        <h2 id="shop-heading">Shop Tina Stays gift cards</h2>
        <p style={{ color: "#717171", marginBottom: 20, lineHeight: 1.6 }}>
          Give the gift of travel. Tina Stays gift cards are redeemable on
          millions of stays worldwide — perfect for every occasion.
        </p>
        <button
          onClick={() => alert("Gift card shop coming soon!")}
          aria-label="Shop Tina Stays gift cards"
        >
          Shop now
        </button>
      </div>

      {/* ── Right: gift card image ── */}
      <div className="shop-image">
        <img
          src="/images/gift-cards.jpg"
          alt="Tina Stays gift cards"
          onError={(e) => {
            e.target.src = "https://picsum.photos/seed/gift-cards/800/600";
          }}
        />
      </div>
    </section>
  );
}

export default ShopAirbnbSection;
