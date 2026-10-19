import "../css/QuickActions.css";
import { FaPlus, FaChartBar, FaBullseye, FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();
  return (
    <div className="quick-actions">
      <h2>⚡ Quick Actions</h2>
      <div className="action-grid">
        <button className="action-btn" onClick={() => navigate("/activity-logging")}><FaPlus /><span>Add Activity</span></button>
        <button className="action-btn" onClick={() => navigate("/insights")}><FaChartBar /><span>View Reports</span></button>
        <button className="action-btn" onClick={() => navigate("/dashboard")}><FaBullseye /><span>Set Goal</span></button>
        <button className="action-btn" onClick={() => navigate("/settings")}><FaUserEdit /><span>Edit Profile</span></button>
      </div>
    </div>
  );
}

export default QuickActions;
