import "../css/Navbar.css";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="nav-brand">
        <FaLeaf className="logo-icon" />
        <span>CarbonTrack</span>
      </Link>
      <nav>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
      <div className="nav-buttons">
        <Link className="login-btn" to="/login">Login</Link>
        <Link className="register-btn" to="/register">Register</Link>
      </div>
    </header>
  );
}

export default Navbar;
