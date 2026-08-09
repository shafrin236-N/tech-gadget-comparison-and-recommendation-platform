import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="home">

      <section className="hero">

        <h1>
          Tech Gadgets Comparison
          <br />
          and Recommendation Application
        </h1>

        <p>
          Search, compare and discover the right
          technology products for your needs.
        </p>

        <Link
          to="/gadgets"
          className="primary-button"
        >
          Explore Gadgets
        </Link>

      </section>


      <section className="features">

        <div className="feature-card">
          <h2>🔎 Search</h2>

          <p>
            Find gadgets based on name,
            brand and category.
          </p>
        </div>


        <div className="feature-card">
          <h2>⚖️ Compare</h2>

          <p>
            Compare gadget specifications
            and prices.
          </p>
        </div>


        <div className="feature-card">
          <h2>🤖 Recommend</h2>

          <p>
            Get suitable gadget recommendations
            based on your requirements.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;