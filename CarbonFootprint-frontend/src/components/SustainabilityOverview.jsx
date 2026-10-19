import { useState } from "react";
import "../css/SustainabilityOverview.css";

function SustainabilityOverview() {
  const [overview] = useState({ totalCO2Reduced: 12450, monthlyGoal: 85, activeUsers: 560 });
  return (
    <div className="sustain-card">
      <h2>🌍 Sustainability Overview</h2>
      <div className="overview-box"><h3>{overview.totalCO2Reduced.toLocaleString()} kg</h3><p>Total CO₂ Reduced</p></div>
      <div className="overview-box"><h3>{overview.monthlyGoal}%</h3><p>Monthly Goal Completed</p></div>
      <div className="overview-box"><h3>{overview.activeUsers.toLocaleString()}</h3><p>Active Users</p></div>
    </div>
  );
}

export default SustainabilityOverview;
