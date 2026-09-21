import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import API_BASE_URL from "../api";
import getGadgetImage from "../utils/gadgetImage";


function ProductVisual({ gadget }) {
  return (
    <div className="product-visual">

      <img
        src={getGadgetImage(gadget)}
        alt={gadget.name}
        className="real-product-image"
        onError={(event) => {
          console.error(
            "Image failed to load:",
            event.currentTarget.src
          );

          event.currentTarget.src =
            "/images/tech-products.jpg";
        }}
      />

    </div>
  );
}


function Gadgets() {
  const [gadgets, setGadgets] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchParams] =
    useSearchParams();


  const [search, setSearch] =
    useState(
      searchParams.get("search") || ""
    );

  const [category, setCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("rating");


  useEffect(() => {
    const loadGadgets = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/gadgets/`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load gadgets. Status: ${response.status}`
          );
        }

        const data =
          await response.json();

        setGadgets(data);

      } catch (err) {
        console.error(err);

        setError(
          "Unable to load products. Make sure the backend is running."
        );

      } finally {
        setLoading(false);
      }
    };


    loadGadgets();

  }, []);


  const categories =
    useMemo(() => {
      return [
        "All",
        ...new Set(
          gadgets.map(
            (gadget) =>
              gadget.category
          )
        ),
      ];
    }, [gadgets]);


  const filteredGadgets =
    useMemo(() => {

      const result =
        gadgets.filter(
          (gadget) => {

            const searchText =
              `${gadget.name || ""} ${
                gadget.brand || ""
              }`.toLowerCase();

            const matchesSearch =
              searchText.includes(
                search.toLowerCase()
              );

            const matchesCategory =
              category === "All" ||
              gadget.category === category;

            return (
              matchesSearch &&
              matchesCategory
            );
          }
        );


      return result.sort(
        (a, b) => {

          if (sortBy === "price-low") {
            return (
              Number(a.price) -
              Number(b.price)
            );
          }


          if (sortBy === "price-high") {
            return (
              Number(b.price) -
              Number(a.price)
            );
          }


          return (
            Number(b.rating || 0) -
            Number(a.rating || 0)
          );
        }
      );

    }, [
      gadgets,
      search,
      category,
      sortBy,
    ]);


  if (loading) {
    return (
      <div className="page-state">

        <div>
          <h2>
            Loading products...
          </h2>

          <p>
            Connecting to the gadget catalog.
          </p>
        </div>

      </div>
    );
  }


  if (error) {
    return (
      <div className="page">

        <div className="error-box">
          {error}
        </div>

      </div>
    );
  }


  return (
    <div className="page">

      {/* PAGE HEADER */}

      <section className="page-header">

        <div>

          <span className="eyebrow">
            PRODUCT CATALOG
          </span>

          <h1>
            Explore gadgets
          </h1>

          <p>
            Search, filter and compare the
            products available on TechCompare.
          </p>

        </div>


        <div className="catalog-count">

          <strong>
            {filteredGadgets.length}
          </strong>

          <span>
            products
          </span>

        </div>

      </section>


      {/* SEARCH AND FILTERS */}

      <section className="catalog-toolbar">

        <div className="catalog-search">

          <span>
            🔎
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search by product or brand..."
          />

        </div>


        <select
          value={category}
          onChange={(event) =>
            setCategory(
              event.target.value
            )
          }
        >

          {categories.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}

        </select>


        <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(
              event.target.value
            )
          }
        >

          <option value="rating">
            Highest Rated
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

        </select>

      </section>


      {/* EMPTY RESULT */}

      {filteredGadgets.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            🔎
          </div>

          <h2>
            No matching products
          </h2>

          <p>
            Try changing your search or filters.
          </p>

        </div>

      ) : (

        /* PRODUCT GRID */

        <div className="catalog-grid">

          {filteredGadgets.map(
            (gadget) => (

              <article
                key={gadget.id}
                className="product-card"
              >

                {/* REAL PRODUCT IMAGE */}

                <ProductVisual
                  gadget={gadget}
                />


                <div className="product-card-body">

                  {/* TOP INFO */}

                  <div className="product-top-row">

                    <span className="category-chip">
                      {gadget.category}
                    </span>


                    <span className="rating-chip">
                      ★ {gadget.rating}
                    </span>

                  </div>


                  {/* PRODUCT NAME */}

                  <h2>
                    {gadget.name}
                  </h2>


                  {/* BRAND */}

                  <p className="product-brand">
                    {gadget.brand}
                  </p>


                  {/* PRICE */}

                  <div className="product-price">

                    ₹
                    {Number(
                      gadget.price
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </div>


                  {/* PERFORMANCE SCORE */}

                  <div className="product-score-row">

                    <span>
                      Performance
                    </span>

                    <strong>
                      {gadget.performance_score ?? 0}
                    </strong>

                  </div>


                  {/* BATTERY SCORE */}

                  <div className="product-score-row">

                    <span>
                      Battery
                    </span>

                    <strong>
                      {gadget.battery_score ?? 0}
                    </strong>

                  </div>


                  {/* VALUE SCORE */}

                  <div className="product-score-row">

                    <span>
                      Value
                    </span>

                    <strong>
                      {gadget.value_score ?? 0}
                    </strong>

                  </div>


                  {/* ACTIONS */}

                  <div className="product-actions">

                    <Link
                      to={`/gadgets/${gadget.id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>


                    <Link
                      to={`/compare?first=${gadget.id}`}
                      className="btn btn-outline"
                    >
                      Compare
                    </Link>

                  </div>

                </div>

              </article>

            )
          )}

        </div>

      )}

    </div>
  );
}


export default Gadgets;