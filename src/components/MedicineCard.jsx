import React from "react";
import "./MedicineCard.css";

const MedicineCard = ({ name, category, stock, usage, sideEffects, manufacturer, image, onAddToCart }) => {
  return (
    <div className="medicine-card">
      <div className="medicine-image-container">
        <img src={image} alt={name} className="medicine-image" />
      </div>
      <div className="medicine-info">
        <h3 className="medicine-name">{name}</h3>
        <p className="medicine-detail"><span>Category:</span> {category}</p>
        <p className="medicine-detail">
          <span>Stock:</span>{" "}
          <span className={stock === 0 ? "out-of-stock" : ""}>
            {stock > 0 ? stock : "Out of Stock"}
          </span>
        </p>
        <p className="medicine-detail"><span>Usage:</span> {usage}</p>
        <p className="medicine-detail"><span>Side Effects:</span> {sideEffects}</p>
        <p className="medicine-detail"><span>Manufacturer:</span> {manufacturer}</p>
        <button
          className="add-to-cart-btn"
          onClick={onAddToCart}
          disabled={stock === 0}
        >
          {stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default MedicineCard;