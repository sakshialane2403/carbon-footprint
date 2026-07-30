import "../css/Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">

          <h2>🌿 CarbonTrack</h2>

          <p>
            Empowering people to monitor, reduce, and manage their
            carbon footprint for a cleaner and greener tomorrow.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#home">Home</a>

          <a href="#features">Features</a>

          <a href="#about">About</a>

          <a href="#contact">Contact</a>

        </div>

        <div className="footer-services">

          <h3>Services</h3>

          <a href="#">Carbon Tracking</a>

          <a href="#">Analytics</a>

          <a href="#">Reports</a>

          <a href="#">Eco Tips</a>

        </div>

        <div className="footer-social">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#"><FaFacebookF /></a>

            <a href="#"><FaInstagram /></a>

            <a href="#"><FaLinkedinIn /></a>

            <a href="#"><FaGithub /></a>

          </div>

        </div>

      </div>

      <hr />

      <div className="copyright">

        <p>
          © 2026 CarbonTrack | Designed by Our Team
        </p>

      </div>

      <button className="scroll-top" onClick={scrollTop}>

        <FaArrowUp />

      </button>

    </footer>
  );
}

export default Footer;