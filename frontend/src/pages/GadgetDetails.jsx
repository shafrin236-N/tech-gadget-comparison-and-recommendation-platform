import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import {
  ArrowRight,
  Star,
  CheckCircle2
} from "lucide-react";

import API_BASE_URL from "../api";


function ScoreBar({
  label,
  value
}) {

  const safeValue =
    Math.max(
      0,
      Math.min(
        100,
        Number(value) || 0
      )
    );


  return (
    <div className="score-item">

      <div className="score-header">

        <span>
          {label}
        </span>

        <strong>
          {safeValue}
        </strong>

      </div>


      <div className="score-track">

        <div
          className="score-fill"
          style={{
            width: `${safeValue}%`
          }}
        />

      </div>

    </div>
  );
}


function GadgetDetails() {

  const { id } =
    useParams();


  const [gadget, setGadget] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  useEffect(() => {

    const loadGadget =
      async () => {

        try {

          const response =
            await fetch(
              `${API_BASE_URL}/gadgets/${id}`
            );


          if (!response.ok) {
            throw new Error(
              "Gadget not found"
            );
          }


          const data =
            await response.json();


          setGadget(data);

        } catch (err) {

          console.error(err);

          setError(
            "Unable to load gadget details."
          );

        } finally {

          setLoading(false);

        }

      };


    loadGadget();

  }, [id]);


  if (loading) {

    return (
      <div className="page-state">

        <div className="loading-spinner" />

        Loading product...

      </div>
    );

  }


  if (!gadget) {

    return (
      <div className="page">

        <div className="error-box">
          {error || "Gadget not found."}
        </div>

      </div>
    );

  }


  const averageScore =
    Math.round(
      (
        Number(
          gadget.performance_score || 0
        ) +
        Number(
          gadget.battery_score || 0
        ) +
        Number(
          gadget.camera_score || 0
        ) +
        Number(
          gadget.durability_score || 0
        ) +
        Number(
          gadget.value_score || 0
        )
      ) / 5
    );


  return (
    <div className="page">

      {/* BREADCRUMBS */}

      <div className="breadcrumbs">

        <Link to="/">
          Home
        </Link>

        <span>
          /
        </span>

        <Link to="/gadgets">
          Gadgets
        </Link>

        <span>
          /
        </span>

        <strong>
          {gadget.name}
        </strong>

      </div>


      {/* PRODUCT HERO */}

      <section className="details-main">

        <div className="details-product-image">

          <img
            src={
              gadget.image_url ||
              "/images/tech-products.jpg"
            }
            alt={gadget.name}
          />

          <span className="details-image-label">
            {gadget.category}
          </span>

        </div>


        <div className="details-content">

          <div className="details-meta">

            <span className="category-chip">
              {gadget.category}
            </span>

            <span className="rating-chip">

              <Star size={11} />

              {gadget.rating}

            </span>

          </div>


          <p className="details-brand">
            {gadget.brand}
          </p>


          <h1>
            {gadget.name}
          </h1>


          <p className="details-description">
            {gadget.description ||
              "Explore the specifications and score breakdown for this gadget."}
          </p>


          <div className="details-price">
            ₹
            {Number(
              gadget.price
            ).toLocaleString("en-IN")}
          </div>


          <div className="details-summary">

            <div>

              <span>
                Overall Score
              </span>

              <strong>
                {averageScore}/100
              </strong>

            </div>


            <div>

              <span>
                Rating
              </span>

              <strong>
                {gadget.rating}/5
              </strong>

            </div>


            <div>

              <span>
                Value Score
              </span>

              <strong>
                {gadget.value_score}/100
              </strong>

            </div>

          </div>


          <div className="details-actions">

            <Link
              to={`/compare?first=${gadget.id}`}
              className="btn btn-dark btn-large"
            >
              Compare Product
              <ArrowRight size={16} />
            </Link>


            <Link
              to="/recommend"
              className="btn btn-outline btn-large"
            >
              Get Recommendation
            </Link>

          </div>

        </div>

      </section>


      {/* SCORE SECTION */}

      <section className="score-section">

        <div className="section-heading">

          <span className="eyebrow">
            PRODUCT ANALYSIS
          </span>

          <h2>
            Performance breakdown
          </h2>

          <p>
            These scores are used by the
            recommendation engine.
          </p>

        </div>


        <div className="scores-grid">

          <ScoreBar
            label="Performance"
            value={gadget.performance_score}
          />

          <ScoreBar
            label="Battery"
            value={gadget.battery_score}
          />

          <ScoreBar
            label="Camera"
            value={gadget.camera_score}
          />

          <ScoreBar
            label="Durability"
            value={gadget.durability_score}
          />

          <ScoreBar
            label="Value"
            value={gadget.value_score}
          />

          <ScoreBar
            label="Gaming"
            value={gadget.gaming_score}
          />

          <ScoreBar
            label="Coding"
            value={gadget.coding_score}
          />

          <ScoreBar
            label="Study"
            value={gadget.study_score}
          />

        </div>

      </section>


      {/* INFORMATION NOTE */}

      <section className="details-note">

        <CheckCircle2 size={19} />

        <div>

          <h3>
            Recommendation-ready product data
          </h3>

          <p>
            TechCompare uses these product scores
            together with budget and usage preferences
            to calculate personalized recommendations.
          </p>

        </div>

      </section>

    </div>
  );
}


export default GadgetDetails;