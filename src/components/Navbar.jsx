import "../css/Navbar.css";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
        <FaLeaf className="logo-icon" />
        <span>CarbonTrack</span>
      </div>

      <nav>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="nav-buttons">
       <Link className="login-btn" to="/login">Login</Link>
       <Link className="register-btn" to="/register">
  Get Started
</Link>
      </div>

    </header>
  );
}

export default Navbar;