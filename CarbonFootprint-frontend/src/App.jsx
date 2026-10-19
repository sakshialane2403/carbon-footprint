import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth, normalizeRole } from "./context/AuthContext.jsx";
import Register from "./pages/Register.jsx";
import RegisterSuccess from "./pages/RegisterSuccess.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddActivity from "./pages/AddActivity.jsx";
import ActivityLogging from "./pages/ActivityLogging.jsx";
import ActivityHistory from "./pages/ActivityHistory.jsx";
import Profile from "./pages/Profile.jsx";
import Reports from "./pages/Reports.jsx";
import Goals from "./pages/Goals.jsx";
import Settings from "./pages/Settings.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Users from "./pages/Users.jsx";
import MasterManagement from "./pages/MasterManagement.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Articles from "./pages/Articles.jsx";
import Insights from "./pages/Insights.jsx";
import AdminArticles from "./pages/AdminArticles.jsx";
import Chatbot from "./components/Chatbot.jsx";
import UserLayout from "./components/UserLayout.jsx";
import OAuthCallback from "./pages/OAuthCallback.jsx";

function AdminGuard({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (normalizeRole(user.role) !== "ADMIN") return <Navigate to="/dashboard" replace />;
  return children;
}

function UserPage({ children }) {
  return (
    <ProtectedRoute>
      <UserLayout>{children}</UserLayout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <>
      <Chatbot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegisterSuccess />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/dashboard" element={<UserPage><Dashboard /></UserPage>} />
        <Route path="/activity" element={<UserPage><AddActivity /></UserPage>} />
        <Route path="/activity-logging" element={<UserPage><ActivityLogging /></UserPage>} />
        <Route path="/activity-history" element={<UserPage><ActivityHistory /></UserPage>} />
        <Route path="/profile" element={<UserPage><Profile /></UserPage>} />
        <Route path="/reports" element={<UserPage><Reports /></UserPage>} />
        <Route path="/goals" element={<UserPage><Goals /></UserPage>} />
        <Route path="/settings" element={<UserPage><Settings /></UserPage>} />
        <Route path="/insights" element={<UserPage><Insights /></UserPage>} />
        <Route path="/articles" element={<UserPage><Articles /></UserPage>} />
        <Route path="/articles/:id" element={<UserPage><Articles /></UserPage>} />
        <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
          <Route index element={<AdminDashboard />} />
          <Route path="pending-users" element={<Users filter="PENDING" title="Pending Users" />} />
          <Route path="approved-users" element={<Users filter="APPROVED" title="Approved Users" />} />
          <Route path="rejected-users" element={<Users filter="REJECTED" title="Rejected Users" />} />
          <Route path="users" element={<Users title="All Users" />} />
          <Route path="activities" element={<ActivityHistory />} />
          <Route path="reports" element={<Reports />} />
          <Route path="goals" element={<Goals />} />
          <Route path="settings" element={<Settings />} />
          <Route path="master-management" element={<MasterManagement />} />
          <Route path="articles" element={<AdminArticles />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
