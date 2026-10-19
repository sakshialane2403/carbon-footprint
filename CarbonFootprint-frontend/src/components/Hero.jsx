import "../css/Hero.css";
import heroImage from "../assets/hero.png";
import { FaLeaf, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <div className="hero-badge">
          <FaLeaf />
          <span>Track • Analyze • Reduce</span>
        </div>
        <h1>
          Track Your
          <br />
          <span>Carbon Footprint</span>
        </h1>
        <p>
          Monitor your daily activities, understand your impact on the environment
          and take steps towards a sustainable future.
        </p>
        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => navigate("/register")}>Get Started</button>
          <button className="secondary-btn" onClick={() => navigate("/login")}>
            Learn More
            <FaArrowRight />
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat-box"><h2>1000+</h2><p>Users</p></div>
          <div className="stat-box"><h2>5000+</h2><p>Activities</p></div>
          <div className="stat-box"><h2>120+</h2><p>Tons CO₂ Saved</p></div>
        </div>
      </div>
      <div className="hero-right">
        <img src={heroImage} alt="Carbon Footprint" />
      </div>
    </section>
  );
}

export default Hero;
