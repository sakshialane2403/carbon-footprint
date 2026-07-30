import "../css/About.css";
import aboutImage from "../assets/about.png";
import {
  FaLeaf,
  FaChartLine,
  FaGlobe,
  FaCheckCircle
} from "react-icons/fa";

function About() {
  return (
    <section className="about" id="about">

      <div className="about-image">
        <img src={aboutImage} alt="About CarbonTrack" />
      </div>

      <div className="about-content">

        <span className="section-tag">ABOUT US</span>

        <h2>
          Building a Sustainable Future with Smart Technology
        </h2>

        <p>
          CarbonTrack is an intelligent carbon footprint monitoring platform
          that helps individuals understand their daily environmental impact.
          Our goal is to encourage sustainable living by providing real-time
          insights, accurate calculations, and actionable recommendations.
        </p>

        <div className="about-features">

          <div className="about-item">
            <FaCheckCircle />
            <span>Track Daily Carbon Emissions</span>
          </div>

          <div className="about-item">
            <FaLeaf />
            <span>Eco-Friendly Suggestions</span>
          </div>

          <div className="about-item">
            <FaChartLine />
            <span>Interactive Analytics Dashboard</span>
          </div>

          <div className="about-item">
            <FaGlobe />
            <span>Support Sustainable Living</span>
          </div>

        </div>

        <button className="about-btn">
          Learn More
        </button>

      </div>

    </section>
  );
}

export default About;