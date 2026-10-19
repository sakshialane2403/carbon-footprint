import "../css/Hero.css";
import heroImage from "../assets/hero.png";
import { FaLeaf, FaArrowRight } from "react-icons/fa";

function Hero() {
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
          Monitor your daily activities, calculate carbon emissions,
          visualize your impact, and contribute towards a cleaner,
          greener and more sustainable future.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Get Started
          </button>

          <button className="secondary-btn">
            Learn More
            <FaArrowRight />
          </button>

        </div>

        <div className="hero-stats">

          <div className="stat-box">
            <h2>1000+</h2>
            <p>Users</p>
          </div>

          <div className="stat-box">
            <h2>5000+</h2>
            <p>Activities</p>
          </div>

          <div className="stat-box">
            <h2>120+</h2>
            <p>Tons CO₂ Saved</p>
          </div>

        </div>

      </div>

      <div className="hero-right">

        <img src={heroImage} alt="Carbon Footprint"/>

      </div>

    </section>
  );
}

export default Hero;