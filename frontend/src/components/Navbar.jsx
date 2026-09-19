import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          TechCompare
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/gadgets">Gadgets</Link>
          <Link to="/recommendations">
            Recommend
          </Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;