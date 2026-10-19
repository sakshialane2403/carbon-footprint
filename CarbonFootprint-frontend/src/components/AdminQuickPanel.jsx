import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminQuickPanel.css";

function AdminQuickPanel() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleAction = (action) => {
    setMessage(action);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleExportData = () => {
    const data = [
      ["User", "Email", "Role", "Status"],
      ["Sakshi", "sakshi@gmail.com", "User", "Active"],
      ["Rahul", "rahul@gmail.com", "User", "Active"],
    ];
    const blob = new Blob([data.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "carbontrack-users.csv";
    link.click();
    URL.revokeObjectURL(url);
    handleAction("📥 User data exported successfully");
  };

  return (
    <div className="admin-quick-panel">
      <h2>⚡ Admin Controls</h2>
      <button onClick={() => navigate("/admin/users")}>➕ Add New User</button>
      <button onClick={() => handleAction("📊 Report generation started")}>📊 Generate Report</button>
      <button onClick={handleExportData}>📥 Export Data</button>
      <button onClick={() => navigate("/admin/settings")}>⚙️ Manage Settings</button>
      {message && <div className="quick-action-message">{message}</div>}
    </div>
  );
}

export default AdminQuickPanel;
