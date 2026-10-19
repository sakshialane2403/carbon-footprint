import "../css/WhyChoose.css";
import { FaCheckCircle } from "react-icons/fa";

function WhyChoose() {
  return (
    <section className="why" id="why">
      <div className="why-title">
        <h2>Why Choose Us?</h2>
      </div>
      <div className="why-grid">
        <div className="why-card"><FaCheckCircle className="why-icon"/><h3>Easy Tracking</h3><p>Track your activities in just a few clicks.</p></div>
        <div className="why-card"><FaCheckCircle className="why-icon"/><h3>Accurate Calculation</h3><p>We use reliable emission factors.</p></div>
        <div className="why-card"><FaCheckCircle className="why-icon"/><h3>Detailed Reports</h3><p>Daily, weekly and monthly insights.</p></div>
        <div className="why-card"><FaCheckCircle className="why-icon"/><h3>Secure & Private</h3><p>Your data is safe with us.</p></div>
      </div>
    </section>
  );
}

export default WhyChoose;
