import React, { useState } from "react";

function Recommendations() {
  const [category, setCategory] = useState("Smartphone");
  const [maxPrice, setMaxPrice] = useState(100000);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecommendations = async () => {
    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      const url =
        `http://127.0.0.1:8000/gadgets/recommend` +
        `?category=${encodeURIComponent(category)}` +
        `&max_price=${maxPrice}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();

      setRecommendations(data.recommendations);
    } catch (error) {
      console.error(error);
      setError("Unable to get recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">

      <h1>Get Gadget Recommendations</h1>

      <p>
        Select a category and maximum budget to find suitable gadgets.
      </p>

      <div className="recommendation-form">

        <label>
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Smartphone">Smartphone</option>
          <option value="Laptop">Laptop</option>
          <option value="Tablet">Tablet</option>
        </select>

        <label>
          Maximum Price
        </label>

        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Enter maximum price"
        />

        <button onClick={getRecommendations}>
          Get Recommendations
        </button>

      </div>

      {loading && (
        <h3>Finding the best gadgets...</h3>
      )}

      {error && (
        <p>{error}</p>
      )}

      {recommendations.length > 0 && (
        <div className="gadget-grid">

          {recommendations.map((gadget) => (
            <div
              className="gadget-card"
              key={gadget.id}
            >

              <h2>{gadget.name}</h2>

              <p>
                <strong>Brand:</strong>{" "}
                {gadget.brand}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {gadget.category}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                ₹{Number(gadget.price).toLocaleString("en-IN")}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                ⭐ {gadget.rating}
              </p>

              <p>
                {gadget.description}
              </p>

            </div>
          ))}

        </div>
      )}

      {!loading &&
        !error &&
        recommendations.length === 0 && (
          <p>
            Select your requirements and click
            "Get Recommendations".
          </p>
        )}

    </div>
  );
}

export default Recommendations;