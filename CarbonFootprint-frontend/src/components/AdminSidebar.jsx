import {
  FaHome,
  FaUsers,
  FaLeaf,
  FaChartBar,
  FaBullseye,
  FaCog,
  FaSignOutAlt,
  FaDatabase,
  FaNewspaper,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../css/AdminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive ? "admin-nav-link active" : "admin-nav-link";

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <span>🌿</span>
        <h2>CarbonTrack</h2>
      </div>
      <ul className="admin-menu">
        <li>
          <NavLink to="/admin" end className={linkClass}>
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={linkClass}>
            <FaUsers />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/activities" className={linkClass}>
            <FaLeaf />
            <span>Activities</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/reports" className={linkClass}>
            <FaChartBar />
            <span>Reports</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/goals" className={linkClass}>
            <FaBullseye />
            <span>Goals</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/master-management" className={linkClass}>
            <FaDatabase />
            <span>Master Management</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/articles" className={linkClass}>
            <FaNewspaper />
            <span>Articles</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/settings" className={linkClass}>
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
      <button className="admin-logout" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default AdminSidebar;
