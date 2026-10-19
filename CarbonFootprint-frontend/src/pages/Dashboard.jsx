import { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards";
import "../css/Dashboard.css";
import Header from "../components/Header";
import CarbonChart from "../components/CarbonChart";
import CategoryChart from "../components/CategoryChart";
import RecentActivities from "../components/RecentActivities";
import GoalProgress from "../components/GoalProgress";
import { useAuth } from "../context/AuthContext.jsx";
import { dashboardSummary, recommendations } from "../services/activityService.js";

function Dashboard() {
  const { user } = useAuth();
  const [rec, setRec] = useState({ topActivities: [], alerts: [], byCategory: {} });
  const [sum, setSum] = useState({ totalEmissions: 0, activityCount: 0, byCategory: [] });

  useEffect(() => {
    if (!user?.userId) return;
    recommendations().then((d) => setRec(d || { topActivities: [], alerts: [], byCategory: {} })).catch(() => {});
    dashboardSummary().then(setSum).catch(() => {});
  }, [user]);

  const pieData = Array.isArray(sum.byCategory)
    ? sum.byCategory
    : Object.entries(rec.byCategory || {}).map(([name, value]) => ({ name, value }));

  return (
    <div className="user-dash">
      <Header profile={user} title="Dashboard" subtitle="Your carbon footprint overview" />
      {!!rec.alerts?.length && (
        <div className="alert-stack">
          {rec.alerts.map((a, i) => (
            <div className="alert-banner" key={i}>{a}</div>
          ))}
        </div>
      )}
      <DashboardCards />
      <div className="chart-section">
        <CarbonChart />
        <CategoryChart data={pieData} />
      </div>
      {!!rec.topActivities?.length && (
        <div className="insight-card" style={{ marginTop: 16 }}>
          <h3>Top 5 high-emission activities</h3>
          <table>
            <thead>
              <tr><th>Activity</th><th>Category</th><th>Emission</th></tr>
            </thead>
            <tbody>
              {rec.topActivities.map((t, i) => (
                <tr key={i}>
                  <td>{t.activityName}</td>
                  <td>{t.category}</td>
                  <td>{Number(t.emission).toFixed(2)} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="dash-bottom">
        <RecentActivities />
        <GoalProgress />
      </div>
    </div>
  );
}

export default Dashboard;
