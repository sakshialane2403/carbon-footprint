import "../css/Features.css";
import {
  FaLeaf,
  FaChartLine,
  FaBullseye,
  FaLightbulb,
} from "react-icons/fa";

function Features() {
  return (
    <section className="features" id="features">

      <div className="section-title">
        <span>OUR FEATURES</span>
        <h2>Everything You Need to Reduce Carbon Emissions</h2>
        <p>
          Our platform helps users monitor, analyze and improve their
          environmental impact through smart technology.
        </p>
      </div>

      <div className="features-grid">

        <div className="feature-card">

          <div className="feature-icon">
            <FaLeaf />
          </div>

          <h3>Track Activities</h3>

          <p>
            Record transportation, electricity, food,
            shopping and other daily activities.
          </p>

          <a href="#">Learn More →</a>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            <FaChartLine />
          </div>

          <h3>Analytics Dashboard</h3>

          <p>
            Interactive graphs and reports help you
            understand your carbon footprint.
          </p>

          <a href="#">Learn More →</a>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            <FaBullseye />
          </div>

          <h3>Set Goals</h3>

          <p>
            Create sustainability goals and monitor
            your monthly progress easily.
          </p>

          <a href="#">Learn More →</a>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            <FaLightbulb />
          </div>

          <h3>Smart Suggestions</h3>

          <p>
            Receive AI-inspired eco-friendly suggestions
            to reduce emissions.
          </p>

          <a href="#">Learn More →</a>

        </div>

      </div>

    </section>
  );
}

export default Features;