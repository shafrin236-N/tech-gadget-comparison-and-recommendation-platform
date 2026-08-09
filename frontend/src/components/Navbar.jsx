import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        TechGadget
      </div>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/gadgets">
          Gadgets
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;