import { useEffect, useState } from "react";

import GadgetCard from "../components/GadgetCard";
import { getGadgets } from "../api";


function Gadgets() {

  const [gadgets, setGadgets] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  async function loadGadgets(searchText = "") {

    try {

      setLoading(true);
      setError("");

      const data = await getGadgets(searchText);

      setGadgets(data);

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    loadGadgets();

  }, []);


  function handleSearch(event) {

    event.preventDefault();

    loadGadgets(search);

  }


  return (
    <div className="gadgets-page">

      <h1>
        Explore Gadgets
      </h1>


      <form
        className="search-form"
        onSubmit={handleSearch}
      >

        <input
          type="text"
          placeholder="Search by name, brand or category..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <button
          type="submit"
          className="primary-button"
        >
          Search
        </button>

      </form>


      {loading && (
        <p className="loading">
          Loading gadgets...
        </p>
      )}


      {error && (
        <p className="error">
          {error}
        </p>
      )}


      {!loading && !error && gadgets.length === 0 && (
        <p>
          No gadgets found.
        </p>
      )}


      <div className="gadget-grid">

        {gadgets.map((gadget) => (
          <GadgetCard
            key={gadget.id}
            gadget={gadget}
          />
        ))}

      </div>

    </div>
  );
}

export default Gadgets;