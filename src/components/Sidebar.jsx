import "../css/Sidebar.css";
import {
  FaLeaf,
  FaHome,
  FaPlusCircle,
  FaChartLine,
  FaBullseye,
  FaUser,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <FaLeaf className="logo-icon" />
        <h2>CarbonTrack</h2>
      </div>

      <ul className="menu">

        <li>
          <NavLink to="/dashboard">
            <FaHome />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/activity">
            <FaPlusCircle />
            Add Activity
          </NavLink>
        </li>

        <li>
          <NavLink to="/reports">
            <FaChartLine />
            Reports
          </NavLink>
        </li>

        <li>
          <NavLink to="/goals">
            <FaBullseye />
            Goals
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile">
            <FaUser />
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings">
            <FaCog />
            Settings
          </NavLink>
        </li>

      </ul>

      <div className="logout">
        <NavLink to="/login">
          <FaSignOutAlt />
          Logout
        </NavLink>
      </div>

    </aside>
  );
}

export default Sidebar;