import React, {
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star
} from "lucide-react";

import API_BASE_URL from "../api";


function RecommendationCard({
  gadget,
  featured = false
}) {

  return (
    <article
      className={
        featured
          ? "recommend-card recommend-featured"
          : "recommend-card"
      }
    >

      {featured && (
        <div className="recommend-badge">

          <Sparkles size={13} />

          Best match based on your requirements

        </div>
      )}


      <div className="recommend-card-top">

        <div className="recommend-product-image">

          <img
            src={
              gadget.image_url ||
              "/images/tech-products.jpg"
            }
            alt={gadget.name}
          />

        </div>


        <div>

          <span className="category-chip">
            {gadget.category}
          </span>

          <h3>
            {gadget.name}
          </h3>

          <p>
            {gadget.brand}
          </p>

        </div>

      </div>


      <div className="match-score-box">

        <div>

          <span>
            Match score
          </span>

          <strong>
            {gadget.score}
          </strong>

        </div>


        <div className="match-circle">

          <span>
            {Math.round(
              Number(
                gadget.score
              ) || 0
            )}
          </span>

          <small>
            /100
          </small>

        </div>

      </div>


      <div className="recommend-price">

        ₹
        {Number(
          gadget.price
        ).toLocaleString("en-IN")}

      </div>


      {gadget.reasons &&
        gadget.reasons.length > 0 && (

          <div className="reason-list">

            {gadget.reasons.map(
              reason => (

                <span
                  key={reason}
                >
                  <CheckCircle2 size={12} />
                  {reason}
                </span>

              )
            )}

          </div>

        )}


      <Link
        to={`/gadgets/${gadget.id}`}
        className="recommend-details"
      >

        View product details

        <ArrowRight size={14} />

      </Link>

    </article>
  );
}


function Recommendations() {

  const [form, setForm] =
    useState({
      category: "Smartphone",
      budget: "80000",
      usage: "Gaming",
      performance_priority: "High",
      battery_priority: "Medium",
      camera_priority: "Medium"
    });


  const [result, setResult] =
    useState(null);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const handleChange =
    event => {

      setForm({
        ...form,
        [event.target.name]:
          event.target.value
      });

    };


  const handleSubmit =
    async event => {

      event.preventDefault();

      setLoading(true);
      setError("");
      setResult(null);


      try {

        const response =
          await fetch(
            `${API_BASE_URL}/gadgets/personalized-recommend`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify({
                  ...form,

                  budget:
                    Number(
                      form.budget
                    )
                })
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.detail ||
            "Unable to generate recommendation."
          );

        }


        setResult(data);

      } catch (err) {

        console.error(err);

        setError(
          err.message ||
          "Unable to generate recommendation."
        );

      } finally {

        setLoading(false);

      }

    };


  const resetForm =
    () => {

      setForm({
        category: "Smartphone",
        budget: "80000",
        usage: "Gaming",
        performance_priority: "High",
        battery_priority: "Medium",
        camera_priority: "Medium"
      });

      setResult(null);
      setError("");

    };


  return (
    <div className="page">

      {/* HEADER */}

      <section className="page-header">

        <div>

          <span className="eyebrow">
            SMART RECOMMENDATION ENGINE
          </span>

          <h1>
            Find your best-fit gadget
          </h1>

          <p>
            Tell us your budget, usage and priorities.
            TechCompare will calculate matching products.
          </p>

        </div>

      </section>


      <section className="recommend-layout">

        {/* FORM */}

        <aside className="recommend-form-card">

          <div className="form-card-heading">

            <span className="form-step">
              STEP 1
            </span>

            <h2>
              Your preferences
            </h2>

            <p>
              These choices influence your
              recommendation score.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="recommend-form"
          >

            <label>

              <span>
                Category
              </span>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >

                <option value="Smartphone">
                  Smartphone
                </option>

              </select>

            </label>


            <label>

              <span>
                Maximum budget
              </span>

              <div className="input-with-prefix">

                <span>
                  ₹
                </span>

                <input
                  type="number"
                  min="1"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  required
                />

              </div>

            </label>


            <label>

              <span>
                Main usage
              </span>

              <select
                name="usage"
                value={form.usage}
                onChange={handleChange}
              >

                <option value="Gaming">
                  Gaming
                </option>

                <option value="Coding">
                  Coding
                </option>

                <option value="Study">
                  Study
                </option>

              </select>

            </label>


            <label>

              <span>
                Performance priority
              </span>

              <select
                name="performance_priority"
                value={
                  form.performance_priority
                }
                onChange={handleChange}
              >

                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>

              </select>

            </label>


            <label>

              <span>
                Battery priority
              </span>

              <select
                name="battery_priority"
                value={
                  form.battery_priority
                }
                onChange={handleChange}
              >

                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>

              </select>

            </label>


            <label>

              <span>
                Camera priority
              </span>

              <select
                name="camera_priority"
                value={
                  form.camera_priority
                }
                onChange={handleChange}
              >

                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>

              </select>

            </label>


            <div className="recommend-form-actions">

              <button
                type="submit"
                className="btn btn-dark full-width"
                disabled={loading}
              >

                {loading
                  ? "Analyzing..."
                  : "Calculate Recommendation"}

                {!loading && (
                  <ArrowRight size={15} />
                )}

              </button>


              <button
                type="button"
                className="btn btn-outline full-width"
                onClick={resetForm}
                disabled={loading}
              >
                Reset
              </button>

            </div>

          </form>

        </aside>


        {/* RESULTS */}

        <div className="recommend-results">

          {!result &&
            !loading &&
            !error && (

              <div className="recommend-placeholder">

                <div className="placeholder-art">

                  <Sparkles size={27} />

                </div>

                <span className="eyebrow">
                  STEP 2
                </span>

                <h2>
                  Your recommendation appears here
                </h2>

                <p>
                  Enter your requirements and let
                  TechCompare analyze the available products.
                </p>

              </div>

            )}


          {loading && (

            <div className="recommend-placeholder">

              <div className="loading-spinner" />

              <span className="eyebrow">
                ANALYZING PRODUCTS
              </span>

              <h2>
                Finding your best match...
              </h2>

              <p>
                Checking budget, performance, battery,
                camera, value and usage fit.
              </p>

            </div>

          )}


          {error && (

            <div className="error-box">
              {error}
            </div>

          )}


          {result && (

            <div className="result-stack">

              {/* CRITERIA */}

              <div className="criteria-summary">

                <div>

                  <span>
                    Category
                  </span>

                  <strong>
                    {result.criteria.category}
                  </strong>

                </div>


                <div>

                  <span>
                    Budget
                  </span>

                  <strong>
                    ₹
                    {Number(
                      result.criteria.budget
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>


                <div>

                  <span>
                    Main usage
                  </span>

                  <strong>
                    {result.criteria.usage}
                  </strong>

                </div>

              </div>


              {/* TOP RECOMMENDATION */}

              {result.top_recommendation && (

                <RecommendationCard
                  gadget={
                    result.top_recommendation
                  }
                  featured={true}
                />

              )}


              {/* WHY */}

              {result.top_recommendation &&
                result.top_recommendation.reasons &&
                result.top_recommendation.reasons.length >
                  0 && (

                  <section className="why-card">

                    <div>

                      <span className="eyebrow">
                        WHY THIS GADGET
                      </span>

                      <h2>
                        Why it matches your needs
                      </h2>

                      <p>
                        These factors contributed to
                        the recommendation.
                      </p>

                    </div>


                    <div className="why-list">

                      {result.top_recommendation.reasons.map(
                        reason => (

                          <div
                            key={reason}
                            className="why-item"
                          >

                            <CheckCircle2
                              size={15}
                            />

                            <strong>
                              {reason}
                            </strong>

                          </div>

                        )
                      )}

                    </div>

                  </section>
                )}


              {/* ALTERNATIVE */}

              {result.alternative && (

                <section className="alternative-card">

                  <div>

                    <span className="eyebrow">
                      LOWER-COST ALTERNATIVE
                    </span>

                    <h2>
                      {result.alternative.name}
                    </h2>

                    <p>
                      A lower-priced option that
                      also fits your selected criteria.
                    </p>

                  </div>


                  <div className="alternative-price">

                    <strong>
                      ₹
                      {Number(
                        result.alternative.price
                      ).toLocaleString("en-IN")}
                    </strong>

                    <span>
                      Save ₹
                      {Number(
                        result.alternative.savings
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>

                </section>

              )}


              {/* OTHER MATCHES */}

              {result.recommendations &&
                result.recommendations.length >
                  1 && (

                  <section>

                    <div className="section-heading small-heading">

                      <span className="eyebrow">
                        OTHER MATCHES
                      </span>

                      <h2>
                        More products to consider
                      </h2>

                    </div>


                    <div className="other-recommendations">

                      {result.recommendations
                        .slice(1)
                        .map(gadget => (

                          <RecommendationCard
                            key={gadget.id}
                            gadget={gadget}
                          />

                        ))}

                    </div>

                  </section>

                )}

            </div>

          )}

        </div>

      </section>

    </div>
  );
}


export default Recommendations;