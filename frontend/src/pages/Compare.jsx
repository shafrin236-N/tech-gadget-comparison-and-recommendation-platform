import React, {
  useEffect,
  useState
} from "react";

import {
  useSearchParams
} from "react-router-dom";

import {
  ArrowRight,
  Star
} from "lucide-react";

import API_BASE_URL from "../api";


function Compare() {

  const [searchParams] =
    useSearchParams();


  const [gadgets, setGadgets] =
    useState([]);


  const [firstId, setFirstId] =
    useState(
      searchParams.get("first") || ""
    );


  const [secondId, setSecondId] =
    useState("");


  const [comparison, setComparison] =
    useState(null);


  const [error, setError] =
    useState("");


  const [loading, setLoading] =
    useState(false);


  useEffect(() => {

    const loadGadgets =
      async () => {

        try {

          const response =
            await fetch(
              `${API_BASE_URL}/gadgets/`
            );


          if (!response.ok) {
            throw new Error(
              "Unable to load gadgets."
            );
          }


          const data =
            await response.json();


          setGadgets(data);

        } catch (err) {

          console.error(err);

          setError(
            "Unable to load gadgets."
          );

        }

      };


    loadGadgets();

  }, []);


  const handleCompare =
    async () => {

      setError("");
      setComparison(null);


      if (!firstId || !secondId) {

        setError(
          "Please select two gadgets."
        );

        return;

      }


      if (firstId === secondId) {

        setError(
          "Please select two different gadgets."
        );

        return;

      }


      try {

        setLoading(true);


        const response =
          await fetch(
            `${API_BASE_URL}/gadgets/compare?gadget1_id=${firstId}&gadget2_id=${secondId}`
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.detail ||
            "Comparison failed."
          );

        }


        setComparison(data);

      } catch (err) {

        console.error(err);

        setError(
          err.message ||
          "Unable to compare products."
        );

      } finally {

        setLoading(false);

      }

    };


  const metrics = [

    {
      label: "Price",
      key: "price",
      lowerIsBetter: true,
      format: value =>
        `₹${Number(value).toLocaleString("en-IN")}`
    },

    {
      label: "Rating",
      key: "rating",
      lowerIsBetter: false,
      format: value =>
        `★ ${value}`
    },

    {
      label: "Performance",
      key: "performance_score",
      lowerIsBetter: false
    },

    {
      label: "Battery",
      key: "battery_score",
      lowerIsBetter: false
    },

    {
      label: "Camera",
      key: "camera_score",
      lowerIsBetter: false
    },

    {
      label: "Durability",
      key: "durability_score",
      lowerIsBetter: false
    },

    {
      label: "Value",
      key: "value_score",
      lowerIsBetter: false
    },

    {
      label: "Gaming",
      key: "gaming_score",
      lowerIsBetter: false
    },

    {
      label: "Coding",
      key: "coding_score",
      lowerIsBetter: false
    },

    {
      label: "Study",
      key: "study_score",
      lowerIsBetter: false
    }

  ];


  const firstBetter =
    (metric, firstValue, secondValue) => {

      if (
        firstValue ===
        secondValue
      ) {
        return false;
      }


      return metric.lowerIsBetter
        ? firstValue < secondValue
        : firstValue > secondValue;

    };


  const secondBetter =
    (metric, firstValue, secondValue) => {

      if (
        firstValue ===
        secondValue
      ) {
        return false;
      }


      return metric.lowerIsBetter
        ? secondValue < firstValue
        : secondValue > firstValue;

    };


  return (
    <div className="page">

      <section className="page-header">

        <div>

          <span className="eyebrow">
            PRODUCT COMPARISON
          </span>

          <h1>
            Compare side by side
          </h1>

          <p>
            Select two products and compare
            their most important metrics.
          </p>

        </div>

      </section>


      {/* PRODUCT SELECTOR */}

      <section className="compare-selector">

        <div className="compare-product-select">

          <label>
            Product 1
          </label>

          <select
            value={firstId}
            onChange={
              event =>
                setFirstId(
                  event.target.value
                )
            }
          >

            <option value="">
              Select a product
            </option>

            {gadgets.map(
              gadget => (

                <option
                  key={gadget.id}
                  value={gadget.id}
                >
                  {gadget.name} — ₹
                  {Number(
                    gadget.price
                  ).toLocaleString("en-IN")}
                </option>

              )
            )}

          </select>

        </div>


        <div className="compare-vs">
          VS
        </div>


        <div className="compare-product-select">

          <label>
            Product 2
          </label>

          <select
            value={secondId}
            onChange={
              event =>
                setSecondId(
                  event.target.value
                )
            }
          >

            <option value="">
              Select a product
            </option>

            {gadgets.map(
              gadget => (

                <option
                  key={gadget.id}
                  value={gadget.id}
                >
                  {gadget.name} — ₹
                  {Number(
                    gadget.price
                  ).toLocaleString("en-IN")}
                </option>

              )
            )}

          </select>

        </div>


        <button
          type="button"
          className="btn btn-dark"
          onClick={handleCompare}
          disabled={loading}
        >

          {loading
            ? "Comparing..."
            : "Compare Now"}

          {!loading && (
            <ArrowRight size={15} />
          )}

        </button>

      </section>


      {error && (

        <div className="error-box compare-error">
          {error}
        </div>

      )}


      {comparison && (

        <section className="comparison-section">

          {/* PRODUCT HEADERS */}

          <div className="comparison-product-head">

            <div className="comparison-product">

              <div className="comparison-avatar">

                <span>
                  {comparison.gadget1.brand
                    ? comparison.gadget1.brand
                        .charAt(0)
                        .toUpperCase()
                    : "T"}
                </span>

              </div>


              <div>

                <span>
                  {comparison.gadget1.brand}
                </span>

                <h2>
                  {comparison.gadget1.name}
                </h2>

                <strong>
                  ₹
                  {Number(
                    comparison.gadget1.price
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            </div>


            <div className="comparison-vs-large">
              VS
            </div>


            <div className="comparison-product">

              <div className="comparison-avatar">

                <span>
                  {comparison.gadget2.brand
                    ? comparison.gadget2.brand
                        .charAt(0)
                        .toUpperCase()
                    : "T"}
                </span>

              </div>


              <div>

                <span>
                  {comparison.gadget2.brand}
                </span>

                <h2>
                  {comparison.gadget2.name}
                </h2>

                <strong>
                  ₹
                  {Number(
                    comparison.gadget2.price
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            </div>

          </div>


          {/* COMPARISON TABLE */}

          <div className="comparison-table-wrapper">

            <table className="comparison-table">

              <thead>

                <tr>

                  <th>
                    Metric
                  </th>

                  <th>
                    {comparison.gadget1.name}
                  </th>

                  <th>
                    {comparison.gadget2.name}
                  </th>

                </tr>

              </thead>


              <tbody>

                {metrics.map(
                  metric => {

                    const firstValue =
                      comparison.gadget1[
                        metric.key
                      ];


                    const secondValue =
                      comparison.gadget2[
                        metric.key
                      ];


                    const firstIsBetter =
                      firstBetter(
                        metric,
                        firstValue,
                        secondValue
                      );


                    const secondIsBetter =
                      secondBetter(
                        metric,
                        firstValue,
                        secondValue
                      );


                    return (

                      <tr
                        key={metric.key}
                      >

                        <td>
                          {metric.label}
                        </td>


                        <td
                          className={
                            firstIsBetter
                              ? "comparison-best"
                              : ""
                          }
                        >

                          <span>

                            {metric.format
                              ? metric.format(
                                  firstValue
                                )
                              : firstValue}

                          </span>


                          {firstIsBetter && (

                            <small>
                              Better
                            </small>

                          )}

                        </td>


                        <td
                          className={
                            secondIsBetter
                              ? "comparison-best"
                              : ""
                          }
                        >

                          <span>

                            {metric.format
                              ? metric.format(
                                  secondValue
                                )
                              : secondValue}

                          </span>


                          {secondIsBetter && (

                            <small>
                              Better
                            </small>

                          )}

                        </td>

                      </tr>

                    );

                  }
                )}

              </tbody>

            </table>

          </div>

        </section>

      )}

    </div>
  );
}


export default Compare;