import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function GadgetDetails() {
  const { id } = useParams();

  const [gadget, setGadget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGadget = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/gadgets/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Gadget not found");
        }

        setGadget(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGadget();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <h2>Loading gadget...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h2>{error}</h2>
        <Link to="/gadgets">Back to Gadgets</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>{gadget.name}</h1>

      <div className="gadget-details">
        <h2>{gadget.brand}</h2>

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

        <p>
          <strong>Description:</strong>
        </p>

        <p>{gadget.description}</p>

        <Link to="/gadgets">
          Back to Gadgets
        </Link>
      </div>
    </div>
  );
}

export default GadgetDetails;