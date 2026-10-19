import "../css/AdminHeader.css";
import { FaBell, FaUserCircle } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import ExportReport from "./ExportReport";

function AdminHeader() {
  return (
    <header className="admin-header">
      <div>
        <h2>Hello Admin 👋</h2>
        <p>Carbon Footprint Monitoring System</p>
      </div>
      <div className="admin-right">
        <FaBell className="bell" />
        <ThemeToggle />
        <ExportReport />
        <div className="admin-profile">
          <FaUserCircle />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
