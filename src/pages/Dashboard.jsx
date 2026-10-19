import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import "../css/Dashboard.css";
import Header from "../components/Header";
import CarbonChart from "../components/CarbonChart";
import CategoryChart from "../components/CategoryChart";
import RecentActivities from "../components/RecentActivities";
import GoalProgress from "../components/GoalProgress";
import EcoTips from "../components/EcoTips";
import ProfileCard from "../components/ProfileCard";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <h1>Welcome Back 👋</h1>

        <p>
          Here's an overview of your carbon footprint today.
        </p>

        <DashboardCards />

        <div className="chart-section">

    <CarbonChart />

    <CategoryChart />

</div>
<RecentActivities />
<div className="widgets">

   <GoalProgress />

   <EcoTips />

   <ProfileCard />

</div>

        <h2 className="section-title">Recent Activities</h2>

<div className="recent-activity">

  <div className="activity-item">
    <span className="activity-name">🚗 Car Travel</span>
    <span className="activity-value">25 kg CO₂</span>
  </div>

  <div className="activity-item">
    <span className="activity-name">⚡ Electricity</span>
    <span className="activity-value">18 kg CO₂</span>
  </div>

  <div className="activity-item">
    <span className="activity-name">🍔 Food Consumption</span>
    <span className="activity-value">12 kg CO₂</span>
  </div>

  <div className="activity-item">
    <span className="activity-name">🛒 Shopping</span>
    <span className="activity-value">8 kg CO₂</span>
  </div>

</div>

      </div>

    </div>
  );
}

export default Dashboard;