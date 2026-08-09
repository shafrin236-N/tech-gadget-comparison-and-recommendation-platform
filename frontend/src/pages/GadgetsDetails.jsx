import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGadget } from "../api";


function GadgetDetails() {

  const { id } = useParams();

  const [gadget, setGadget] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    async function loadGadget() {

      try {

        const data = await getGadget(id);

        setGadget(data);

      } catch (error) {

        setError(error.message);

      } finally {

        setLoading(false);

      }

    }

    loadGadget();

  }, [id]);


  if (loading) {
    return <p className="loading">Loading...</p>;
  }


  if (error) {
    return <p className="error">{error}</p>;
  }


  if (!gadget) {
    return <p>Gadget not found.</p>;
  }


  return (
    <div className="details-page">

      <h1>
        {gadget.name}
      </h1>

      <p className="details-description">
        {gadget.description}
      </p>


      <div className="specification-card">

        <h2>
          Gadget Specifications
        </h2>


        <div className="spec-row">
          <strong>Brand</strong>
          <span>{gadget.brand}</span>
        </div>


        <div className="spec-row">
          <strong>Category</strong>
          <span>{gadget.category}</span>
        </div>


        <div className="spec-row">
          <strong>Price</strong>
          <span>
            ₹{gadget.price.toLocaleString("en-IN")}
          </span>
        </div>


        <div className="spec-row">
          <strong>Processor</strong>
          <span>{gadget.processor || "N/A"}</span>
        </div>


        <div className="spec-row">
          <strong>RAM</strong>
          <span>{gadget.ram || "N/A"}</span>
        </div>


        <div className="spec-row">
          <strong>Storage</strong>
          <span>{gadget.storage || "N/A"}</span>
        </div>


        <div className="spec-row">
          <strong>Display</strong>
          <span>{gadget.display || "N/A"}</span>
        </div>


        <div className="spec-row">
          <strong>Battery</strong>
          <span>{gadget.battery || "N/A"}</span>
        </div>


        <div className="spec-row">
          <strong>Rating</strong>
          <span>⭐ {gadget.rating}</span>
        </div>

      </div>


      <div className="future-feature">

        <h2>
          Compare This Gadget
        </h2>

        <p>
          Comparison functionality will be added
          in the next development phase.
        </p>

      </div>

    </div>
  );
}

export default GadgetDetails;