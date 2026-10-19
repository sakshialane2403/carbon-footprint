import { useState } from "react";
import "../css/AdminProfile.css";

function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "Admin",
    role: "System Administrator",
    users: 245,
    activities: 1280,
    ecoScore: 92,
  });
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="admin-profile-card">
      <div className="profile-icon">👤</div>
      <h2>{profile.name}</h2>
      <p>{profile.role}</p>
      <div className="profile-data">
        <p>👥 Users : <strong>{profile.users.toLocaleString()}</strong></p>
        <p>🌱 Activities : <strong>{profile.activities.toLocaleString()}</strong></p>
        <p>🏆 Eco Score : <strong>{profile.ecoScore}/100</strong></p>
      </div>
      <div className="profile-actions">
        <button className="profile-view-btn" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "View Details"}
        </button>
        <button className="profile-refresh-btn" onClick={() => setProfile((p) => ({ ...p, users: p.users + 1, activities: p.activities + 1 }))}>🔄</button>
      </div>
      {showDetails && (
        <div className="profile-details">
          <p><strong>Account:</strong> Administrator</p>
          <p><strong>Access:</strong> Full Access</p>
          <p><strong>Platform:</strong> CarbonTrack</p>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
