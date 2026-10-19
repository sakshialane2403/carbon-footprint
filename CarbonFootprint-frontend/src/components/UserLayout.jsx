import Sidebar from "./Sidebar.jsx";
import "../css/AdminLayout.css";
import "../css/user-pages.css";

export default function UserLayout({ children }) {
  return (
    <div className="admin-layout user-layout">
      <Sidebar />
      <div className="admin-layout-content user-layout-content">
        <main className="admin-page-content user-page-wrap">{children}</main>
      </div>
    </div>
  );
}
