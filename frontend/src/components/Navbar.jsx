import React, { useState } from "react";
import {
  Link,
  NavLink
} from "react-router-dom";

import {
  CircleUserRound,
  GitCompareArrows,
  Menu,
  Search,
  Sparkles,
  X
} from "lucide-react";


function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);


  const closeMenu = () => {
    setMenuOpen(false);
  };


  const navClass = ({ isActive }) =>
    isActive
      ? "nav-link active"
      : "nav-link";


  return (
    <header className="navbar">

      <div className="navbar-inner">

        {/* BRAND */}

        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >

          <span className="brand-mark">
            T
          </span>

          <span className="brand-text">
            TechCompare
          </span>

        </Link>


        {/* DESKTOP NAVIGATION */}

        <nav className="nav-links desktop-nav">

          <NavLink
            to="/"
            className={navClass}
          >
            Home
          </NavLink>


          <NavLink
            to="/gadgets"
            className={navClass}
          >
            Gadgets
          </NavLink>


          <NavLink
            to="/compare"
            className={navClass}
          >

            <GitCompareArrows size={15} />

            Compare

          </NavLink>


          <NavLink
            to="/recommend"
            className={navClass}
          >

            <Sparkles size={15} />

            Recommendations

          </NavLink>

        </nav>


        {/* RIGHT SIDE */}

        <div className="nav-actions">

          <Link
            to="/gadgets"
            className="nav-icon-button"
            aria-label="Search gadgets"
          >
            <Search size={17} />
          </Link>


          <Link
            to="/login"
            className="nav-login"
          >

            <CircleUserRound size={16} />

            Login

          </Link>


          <Link
            to="/register"
            className="nav-register"
          >
            Get Started
          </Link>


          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Open navigation"
          >

            {menuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}

          </button>

        </div>

      </div>


      {/* MOBILE NAVIGATION */}

      {menuOpen && (

        <nav className="mobile-nav">

          <NavLink
            to="/"
            className={navClass}
            onClick={closeMenu}
          >
            Home
          </NavLink>


          <NavLink
            to="/gadgets"
            className={navClass}
            onClick={closeMenu}
          >
            Gadgets
          </NavLink>


          <NavLink
            to="/compare"
            className={navClass}
            onClick={closeMenu}
          >
            <GitCompareArrows size={15} />
            Compare
          </NavLink>


          <NavLink
            to="/recommend"
            className={navClass}
            onClick={closeMenu}
          >
            <Sparkles size={15} />
            Recommendations
          </NavLink>


          <NavLink
            to="/login"
            className={navClass}
            onClick={closeMenu}
          >
            Login
          </NavLink>


          <NavLink
            to="/register"
            className={navClass}
            onClick={closeMenu}
          >
            Get Started
          </NavLink>

        </nav>

      )}

    </header>
  );
}


export default Navbar;