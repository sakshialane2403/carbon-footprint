import "../css/Stats.css";
import {
  FaUsers,
  FaLeaf,
  FaChartBar,
  FaGlobeAsia,
} from "react-icons/fa";

function Stats() {
  return (
    <section className="stats">

      <div className="stats-title">
        <span>OUR IMPACT</span>
        <h2>Making Sustainability Measurable</h2>
        <p>
          Thousands of users trust CarbonTrack to monitor and
          reduce their environmental impact.
        </p>
      </div>

      <div className="stats-container">

        <div className="stats-card">
          <FaUsers className="stats-icon" />
          <h2>1,000+</h2>
          <p>Active Users</p>
        </div>

        <div className="stats-card">
          <FaLeaf className="stats-icon" />
          <h2>5,000+</h2>
          <p>Activities Logged</p>
        </div>

        <div className="stats-card">
          <FaChartBar className="stats-icon" />
          <h2>120+</h2>
          <p>Tons CO₂ Saved</p>
        </div>

        <div className="stats-card">
          <FaGlobeAsia className="stats-icon" />
          <h2>95%</h2>
          <p>User Satisfaction</p>
        </div>

      </div>

    </section>
  );
}

export default Stats;