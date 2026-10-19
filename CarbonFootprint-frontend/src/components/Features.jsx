import "../css/Features.css";
import { FaClipboardList, FaChartLine, FaBullseye, FaLightbulb } from "react-icons/fa";

function Features() {
  return (
    <section className="features" id="features">
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon"><FaClipboardList /></div>
          <h3>Track Activities</h3>
          <p>Log your daily activities easily.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><FaChartLine /></div>
          <h3>Analyze Impact</h3>
          <p>Get detailed insights and analytics.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><FaBullseye /></div>
          <h3>Set Goals</h3>
          <p>Set sustainability goals and track progress.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><FaLightbulb /></div>
          <h3>Get Suggestions</h3>
          <p>Personalized tips to reduce emissions.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
