import AdminCards from "../../components/AdminCards.jsx";
import UsersTable from "../../components/UsersTable.jsx";
import AdminAnalytics from "../../components/AdminAnalytics.jsx";
import AdminNotifications from "../../components/AdminNotifications.jsx";
import AdminQuickPanel from "../../components/AdminQuickPanel.jsx";
import AdminProfile from "../../components/AdminProfile.jsx";
import SustainabilityOverview from "../../components/SustainabilityOverview.jsx";

export default function AdminHome() {
  return (
    <>
      <AdminCards />
      <UsersTable />
      <AdminAnalytics />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 16, marginTop: 20 }}>
        <AdminNotifications />
        <AdminQuickPanel />
        <div>
          <AdminProfile />
          <div style={{ height: 16 }} />
          <SustainabilityOverview />
        </div>
      </div>
    </>
  );
}
