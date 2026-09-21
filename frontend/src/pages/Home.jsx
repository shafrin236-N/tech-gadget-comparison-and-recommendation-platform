import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GitCompareArrows,
  Search,
  Sparkles,
  Star
} from "lucide-react";

import API_BASE_URL from "../api";


function Home() {

  const [gadgets, setGadgets] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const navigate =
    useNavigate();


  useEffect(() => {

    const loadGadgets = async () => {

      try {

        const response =
          await fetch(
            `${API_BASE_URL}/gadgets/`
          );

        if (!response.ok) {
          throw new Error(
            "Unable to fetch gadgets"
          );
        }

        const data =
          await response.json();

        setGadgets(data);

      } catch (error) {

        console.error(error);

      }

    };


    loadGadgets();

  }, []);


  const handleSearch =
    (event) => {

      event.preventDefault();

      const value =
        search.trim();

      if (!value) {
        navigate("/gadgets");
        return;
      }

      navigate(
        `/gadgets?search=${encodeURIComponent(value)}`
      );

    };


  const featured =
    gadgets.slice(0, 3);


  return (
    <div className="home-page">

      {/* HERO */}

      <section className="hero">

        <div className="hero-left">

          <div className="eyebrow-row">

            <span className="eyebrow">
              SMART TECH DISCOVERY
            </span>

            <span className="eyebrow-dot">
              ●
            </span>

            <span className="eyebrow-live">
              PLATFORM
            </span>

          </div>


          <h1>

            Choose the right

            <span className="hero-highlight">
              gadget
            </span>

            with confidence.

          </h1>


          <p className="hero-description">
            Compare products, understand their
            strengths and discover gadgets matched
            to your budget, usage and priorities.
          </p>


          <form
            className="hero-search"
            onSubmit={handleSearch}
          >

            <Search
              size={18}
              className="hero-search-icon"
            />

            <input
              type="text"
              value={search}
              onChange={
                event =>
                  setSearch(
                    event.target.value
                  )
              }
              placeholder="Search gadgets or brands..."
            />

            <button
              type="submit"
              className="btn btn-dark"
            >
              Search
            </button>

          </form>


          <div className="hero-actions">

            <Link
              to="/gadgets"
              className="btn btn-dark btn-large"
            >
              Explore Gadgets
              <ArrowRight size={17} />
            </Link>


            <Link
              to="/recommend"
              className="btn btn-white btn-large"
            >
              <Sparkles size={16} />
              Find My Gadget
            </Link>

          </div>


          <div className="hero-stats">

            <div className="hero-stat">

              <strong>
                {gadgets.length}
              </strong>

              <span>
                Products
              </span>

            </div>


            <div className="hero-stat-divider" />


            <div className="hero-stat">

              <strong>
                8
              </strong>

              <span>
                Product Metrics
              </span>

            </div>


            <div className="hero-stat-divider" />


            <div className="hero-stat">

              <strong>
                100
              </strong>

              <span>
                Score Scale
              </span>

            </div>

          </div>

        </div>


        {/* HERO PRODUCT IMAGE */}

        <div className="hero-right">

          <div className="hero-image-card">

            <div className="hero-image-overlay" />


            <img
              src="/images/tech-products.jpg"
              alt="Modern technology products"
              className="hero-product-image"
            />


            <div className="hero-image-top">

              <span>
                TECHCOMPARE
              </span>

              <span>
                PRODUCT DISCOVERY
              </span>

            </div>


            <div className="hero-image-bottom">

              <div>

                <span>
                  Smart analysis
                </span>

                <strong>
                  Find your best fit.
                </strong>

              </div>


              <div className="hero-score-badge">

                <Star size={14} />

                <span>
                  Match engine
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURE SECTION */}

      <section className="section">

        <div className="section-heading">

          <span className="eyebrow">
            WHY TECHCOMPARE
          </span>

          <h2>
            Everything you need before choosing a gadget
          </h2>

          <p>
            One place to search, analyze, compare and
            discover products based on your actual needs.
          </p>

        </div>


        <div className="feature-grid">

          <article className="feature-card">

            <div className="feature-icon">
              <Search size={21} />
            </div>

            <h3>
              Search faster
            </h3>

            <p>
              Find products by gadget name or brand
              without navigating through multiple pages.
            </p>

          </article>


          <article className="feature-card">

            <div className="feature-icon">
              <GitCompareArrows size={21} />
            </div>

            <h3>
              Compare clearly
            </h3>

            <p>
              Put two gadgets side by side and
              understand their key differences.
            </p>

          </article>


          <article className="feature-card">

            <div className="feature-icon">
              <Sparkles size={21} />
            </div>

            <h3>
              Personalize your choice
            </h3>

            <p>
              Your budget, usage and priorities influence
              the recommendation score.
            </p>

          </article>


          <article className="feature-card">

            <div className="feature-icon">
              <BarChart3 size={21} />
            </div>

            <h3>
              Understand the data
            </h3>

            <p>
              View performance, battery, camera, value
              and usage-specific scores.
            </p>

          </article>

        </div>

      </section>


      {/* FEATURED PRODUCTS */}

      <section className="section section-light">

        <div className="section-heading-row">

          <div className="section-heading no-margin">

            <span className="eyebrow">
              PRODUCT CATALOG
            </span>

            <h2>
              Explore popular gadgets
            </h2>

            <p>
              Browse products currently available
              on the platform.
            </p>

          </div>


          <Link
            to="/gadgets"
            className="text-link"
          >
            View all
            <ArrowRight size={15} />
          </Link>

        </div>


        <div className="home-products-grid">

          {featured.map(
            gadget => (

              <Link
                key={gadget.id}
                to={`/gadgets/${gadget.id}`}
                className="home-product-card"
              >

                <div className="home-product-image">

                  <img
                    src={
                      gadget.image_url ||
                      "/images/tech-products.jpg"
                    }
                    alt={gadget.name}
                  />

                </div>


                <div className="home-product-info">

                  <div className="product-meta-line">

                    <span className="category-chip">
                      {gadget.category}
                    </span>

                    <span className="rating-chip">
                      <Star size={11} />
                      {gadget.rating}
                    </span>

                  </div>


                  <h3>
                    {gadget.name}
                  </h3>


                  <p>
                    {gadget.brand}
                  </p>


                  <strong>
                    ₹
                    {Number(
                      gadget.price
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>

              </Link>

            )
          )}

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="section">

        <div className="section-heading">

          <span className="eyebrow">
            HOW IT WORKS
          </span>

          <h2>
            From requirements to recommendation
          </h2>

          <p>
            A simple product-discovery flow designed
            around your preferences.
          </p>

        </div>


        <div className="process-grid">

          <article className="process-card">

            <span>
              01
            </span>

            <div className="process-icon">
              <Search size={19} />
            </div>

            <h3>
              Explore
            </h3>

            <p>
              Search and browse gadgets that match
              your category and budget.
            </p>

          </article>


          <div className="process-arrow">
            →
          </div>


          <article className="process-card">

            <span>
              02
            </span>

            <div className="process-icon">
              <BarChart3 size={19} />
            </div>

            <h3>
              Analyze
            </h3>

            <p>
              Review scores for performance, battery,
              camera, value and other metrics.
            </p>

          </article>


          <div className="process-arrow">
            →
          </div>


          <article className="process-card">

            <span>
              03
            </span>

            <div className="process-icon">
              <Sparkles size={19} />
            </div>

            <h3>
              Decide
            </h3>

            <p>
              Use personalized recommendations and
              comparison results to narrow your choice.
            </p>

          </article>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="final-cta">

        <div>

          <span className="eyebrow">
            SMARTER PRODUCT DISCOVERY
          </span>

          <h2>
            Find a gadget that fits your priorities.
          </h2>

          <p>
            Start with your budget and usage, then let
            TechCompare analyze the available options.
          </p>

        </div>


        <Link
          to="/recommend"
          className="btn btn-white btn-large"
        >
          Start Recommendation
          <ArrowRight size={16} />
        </Link>

      </section>


      {/* SIMPLE FOOTER AREA — NO FOOTER COMPONENT */}

      <div className="simple-footer">

        <div>
          <strong>
            TechCompare
          </strong>

          <span>
            Tech Gadget Comparison and Recommendation Platform
          </span>
        </div>

        <span>
          © 2026 TechCompare
        </span>

      </div>

    </div>
  );
}


export default Home;