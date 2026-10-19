import { useState } from "react";
import "../css/AdminNotifications.css";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New user registered", type: "User", read: false },
    { id: 2, message: "Monthly report generated", type: "Report", read: false },
    { id: 3, message: "Carbon goal achieved", type: "Goal", read: true },
    { id: 4, message: "New activity added", type: "Activity", read: false },
  ]);

  const handleRead = (id) =>
    setNotifications((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const handleDelete = (id) => setNotifications((p) => p.filter((n) => n.id !== id));
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notification-card">
      <div className="notification-header">
        <div>
          <h2>🔔 Recent Notifications</h2>
          <p>{unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}</p>
        </div>
        {notifications.length > 0 && (
          <button className="clear-notifications" onClick={() => setNotifications([])}>Clear All</button>
        )}
      </div>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((n) => (
            <li key={n.id} className={n.read ? "read" : "unread"}>
              <span className="notification-dot">●</span>
              <div className="notification-content">
                <strong>{n.type}</strong>
                <p>{n.message}</p>
              </div>
              {!n.read && <button className="read-btn" onClick={() => handleRead(n.id)}>Mark read</button>}
              <button className="notification-delete" onClick={() => handleDelete(n.id)}>×</button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-notifications"><span>🔕</span><p>No notifications</p></div>
      )}
    </div>
  );
}

export default AdminNotifications;
