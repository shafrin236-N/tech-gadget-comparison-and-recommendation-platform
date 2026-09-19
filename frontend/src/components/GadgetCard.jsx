import React from "react";
import { Link } from "react-router-dom";


function GadgetCard({ gadget }) {
  return (
    <div className="gadget-card">

      <div className="gadget-image">
        📱
      </div>

      <div className="gadget-content">

        <h3>
          {gadget.name}
        </h3>

        <p>
          <strong>Brand:</strong> {gadget.brand}
        </p>

        <p>
          <strong>Category:</strong> {gadget.category}
        </p>

        <p>
          <strong>Price:</strong> ₹
          {gadget.price.toLocaleString("en-IN")}
        </p>

        <p>
          <strong>Rating:</strong> ⭐ {gadget.rating}
        </p>

        <Link
          className="details-button"
          to={`/gadgets/${gadget.id}`}
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default GadgetCard;