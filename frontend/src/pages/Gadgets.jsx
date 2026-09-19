import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Gadgets() {
  const [gadgets, setGadgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/gadgets/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load gadgets");
        }

        return response.json();
      })
      .then((data) => {
        setGadgets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load gadgets");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page">
        <h1>Loading Gadgets...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1>Gadgets</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Available Gadgets</h1>

      {gadgets.length === 0 ? (
        <p>No gadgets found.</p>
      ) : (
        <div className="gadget-grid">
          {gadgets.map((gadget) => (
            <div className="gadget-card" key={gadget.id}>
              <h2>{gadget.name}</h2>

              <p>
                <strong>Brand:</strong> {gadget.brand}
              </p>

              <p>
                <strong>Category:</strong> {gadget.category}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                ₹{Number(gadget.price).toLocaleString("en-IN")}
              </p>

              <p>
                <strong>Rating:</strong> ⭐ {gadget.rating}
              </p>

              <p>{gadget.description}</p>

              <Link to={"/gadgets/" + gadget.id}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gadgets;