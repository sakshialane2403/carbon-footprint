import "../css/WhyChoose.css";
import {
  FaShieldAlt,
  FaChartPie,
  FaLeaf,
  FaUserFriends,
  FaMobileAlt,
  FaCloud
} from "react-icons/fa";

function WhyChoose() {
  return (
    <section className="why" id="why">

      <div className="why-title">

        <span>WHY CHOOSE US</span>

        <h2>Why Thousands of Users Trust CarbonTrack</h2>

        <p>
          We provide everything you need to understand,
          reduce and manage your carbon footprint with
          modern technology.
        </p>

      </div>

      <div className="why-grid">

        <div className="why-card">
          <FaShieldAlt className="why-icon"/>
          <h3>Secure Platform</h3>
          <p>Your activity data remains protected and secure.</p>
        </div>

        <div className="why-card">
          <FaChartPie className="why-icon"/>
          <h3>Smart Analytics</h3>
          <p>Interactive dashboards help visualize emissions.</p>
        </div>

        <div className="why-card">
          <FaLeaf className="why-icon"/>
          <h3>Eco Friendly</h3>
          <p>Simple suggestions to build greener habits.</p>
        </div>

        <div className="why-card">
          <FaUserFriends className="why-icon"/>
          <h3>User Friendly</h3>
          <p>Easy navigation and clean interface for everyone.</p>
        </div>

        <div className="why-card">
          <FaMobileAlt className="why-icon"/>
          <h3>Responsive Design</h3>
          <p>Works perfectly on desktop, tablet and mobile.</p>
        </div>

        <div className="why-card">
          <FaCloud className="why-icon"/>
          <h3>Cloud Ready</h3>
          <p>Future-ready architecture for scalable deployment.</p>
        </div>

      </div>

    </section>
  );
}

export default WhyChoose;