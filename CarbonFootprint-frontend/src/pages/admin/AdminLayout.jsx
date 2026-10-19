import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="shell">
      <aside className="side">
        <h3>CarbonTrack</h3>
        <small>Admin · {user?.username} · Online</small>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/master-management">Master data</NavLink>
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
      <section className="main">
        <Outlet />
      </section>
    </div>
  );
}
