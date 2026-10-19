import {
  FaLeaf,
  FaHome,
  FaPlusCircle,
  FaHistory,
  FaChartBar,
  FaBullseye,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBook,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../css/AdminSidebar.css";
import "../css/Sidebar.css";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive ? "admin-nav-link active" : "admin-nav-link";

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <FaLeaf />
        <h2>CarbonTrack</h2>
      </div>
      <ul className="admin-menu">
        <li><NavLink to="/dashboard" className={linkClass}><FaHome /><span>Dashboard</span></NavLink></li>
        <li><NavLink to="/activity" className={linkClass}><FaPlusCircle /><span>Add Activity</span></NavLink></li>
        <li><NavLink to="/activity-logging" className={linkClass}><FaPlusCircle /><span>Log Activity</span></NavLink></li>
        <li><NavLink to="/activity-history" className={linkClass}><FaHistory /><span>Activity History</span></NavLink></li>
        <li><NavLink to="/reports" className={linkClass}><FaChartBar /><span>Reports</span></NavLink></li>
        <li><NavLink to="/goals" className={linkClass}><FaBullseye /><span>Goals</span></NavLink></li>
        <li><NavLink to="/articles" className={linkClass}><FaBook /><span>Articles</span></NavLink></li>
        <li><NavLink to="/profile" className={linkClass}><FaUser /><span>Profile</span></NavLink></li>
        <li><NavLink to="/settings" className={linkClass}><FaCog /><span>Settings</span></NavLink></li>
      </ul>
      <button className="admin-logout" onClick={() => { logout(); navigate("/login"); }}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;
