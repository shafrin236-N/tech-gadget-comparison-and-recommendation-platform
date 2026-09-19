import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <div className="hero-content">
          <h1>
            Find the Right
            <span> Tech Gadget </span>
            for You
          </h1>

          <p>
            Compare smartphones, laptops, tablets and other
            gadgets and get personalized recommendations.
          </p>

          <div className="hero-buttons">
            <Link
              to="/gadgets"
              className="primary-button"
            >
              Explore Gadgets
            </Link>

            <Link
              to="/recommendations"
              className="secondary-button"
            >
              Get Recommendation
            </Link>
          </div>
        </div>
      </section>

      <section className="features">

        <div className="feature-card">
          <div>🔍</div>
          <h3>Search Gadgets</h3>
          <p>
            Quickly find gadgets based on your requirements.
          </p>
        </div>

        <div className="feature-card">
          <div>⚖️</div>
          <h3>Compare Products</h3>
          <p>
            Compare specifications, prices and ratings.
          </p>
        </div>

        <div className="feature-card">
          <div>🤖</div>
          <h3>Smart Recommendations</h3>
          <p>
            Get recommendations based on your preferences.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;