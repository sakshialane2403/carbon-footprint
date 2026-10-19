import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function UserShell({ children }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="shell">
      <aside className="side">
        <h3>CarbonTrack</h3>
        <small>{user?.name || user?.username} · Online</small>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/activity-logging">Log activity</NavLink>
        <NavLink to="/activity-history">History</NavLink>
        <NavLink to="/insights">Insights</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <button
          className="link"
          onClick={() => {
            logout();
            nav("/login");
          }}
        >
          Logout
        </button>
      </aside>
      <section className="main">{children}</section>
    </div>
  );
}
