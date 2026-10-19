import { useAuth } from "../context/AuthContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import DashboardCards from "../components/DashboardCards.jsx";
import RecentActivities from "../components/RecentActivities.jsx";
import CarbonChart from "../components/CarbonChart.jsx";
import CategoryChart from "../components/CategoryChart.jsx";
import GoalProgress from "../components/GoalProgress.jsx";
import EcoTips from "../components/EcoTips.jsx";
import Achievements from "../components/Achievements.jsx";
import QuickActions from "../components/QuickActions.jsx";
import ProgressSummary from "../components/ProgressSummary.jsx";
import ProfileCard from "../components/ProfileCard.jsx";

export default function UserDashboard() {
  const { user } = useAuth();
  return (
    <div className="shell" style={{ gridTemplateColumns: "250px 1fr" }}>
      <Sidebar />
      <section className="main">
        <Header profile={user} />
        <DashboardCards />
        <div style={{ marginTop: 20 }}>
          <ProgressSummary />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginTop: 20 }}>
          <div className="card" style={{ padding: 16 }}>
            <CarbonChart />
          </div>
          <div className="card" style={{ padding: 16 }}>
            <CategoryChart />
          </div>
        </div>
        <RecentActivities />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 20 }}>
          <GoalProgress />
          <QuickActions />
          <ProfileCard />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
          <Achievements />
          <EcoTips />
        </div>
      </section>
    </div>
  );
}
