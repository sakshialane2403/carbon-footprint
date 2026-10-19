import AdminCards from "../components/AdminCards";
import AdminAnalytics from "../components/AdminAnalytics";
import Users from "./Users.jsx";
import "../css/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <section className="dashboard-section">
        <div className="section-heading">
          <h2>Dashboard</h2>
        </div>
        <AdminCards />
      </section>

      <section className="dashboard-section">
        <AdminAnalytics />
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <h2>Recent Registration Requests</h2>
        </div>
        <Users filter="PENDING" title="Pending Users" />
      </section>
    </div>
  );
}

export default AdminDashboard;
