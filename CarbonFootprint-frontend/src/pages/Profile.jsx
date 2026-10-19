import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import { dashboardSummary } from "../services/activityService.js";

const Profile = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [msg, setMsg] = useState("");
  const [profile, setProfile] = useState({
    name: user?.name || user?.username || "User",
    email: user?.email || "",
    phone: "",
    location: "India",
  });
  const [stats, setStats] = useState({ ecoScore: 0, totalEmissions: 0, activities: 0 });

  useEffect(() => {
    if (!user?.userId) return;
    api.get("/users/profile", { params: { userId: user.userId } })
      .then((r) => {
        const d = r.data || {};
        setProfile({
          name: d.name || user.username,
          email: d.email || "",
          phone: d.mobile || d.mobileNumber || d.phone || "",
          location: d.location || d.city || "India",
        });
      })
      .catch(() => {});
    dashboardSummary()
      .then((s) => setStats({ ecoScore: s.ecoScore, totalEmissions: s.totalEmissions, activities: s.activityCount }))
      .catch(() => {});
  }, [user]);

  const save = async () => {
    setMsg("");
    try {
      await api.put("/users/profile", profile, { params: { userId: user.userId } });
      setMsg("Profile saved.");
      setEditMode(false);
    } catch {
      setMsg("Could not save profile.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <span className="profile-label">MY ACCOUNT</span>
          <h1>Profile</h1>
        </div>
        <button className={editMode ? "save-profile-btn" : "edit-profile-btn"} onClick={() => (editMode ? save() : setEditMode(true))}>
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
      {msg && <p className="ok" style={{ marginBottom: 12 }}>{msg}</p>}
      <div className="profile-hero">
        <div className="profile-avatar-large">{(profile.name || "U").charAt(0).toUpperCase()}</div>
        <div className="profile-hero-info">
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          <div className="profile-badges"><span>Verified Account</span><span>Eco Member</span></div>
        </div>
        <div className="eco-score">
          <div className="eco-score-circle"><strong>{stats.ecoScore}</strong><small>/100</small></div>
          <div><h3>Eco Score</h3><p>From your activities</p></div>
        </div>
      </div>
      <div className="profile-grid">
        <div className="profile-card">
          <h2>Personal Information</h2>
          <div className="profile-form">
            {[["name", "Full name"], ["email", "Email"], ["phone", "Mobile"], ["location", "Location"]].map(([k, label]) => (
              <div className="profile-field" key={k}>
                <label>{label}</label>
                {editMode
                  ? <input name={k} value={profile[k]} onChange={(e) => setProfile({ ...profile, [k]: e.target.value })} />
                  : <div className="field-value">{profile[k] || "—"}</div>}
              </div>
            ))}
          </div>
        </div>
        <div className="profile-card">
          <h2>Account Overview</h2>
          <div className="overview-list">
            <div className="overview-item"><span>Total Emissions</span><b>{Number(stats.totalEmissions).toFixed(2)} kg</b></div>
            <div className="overview-item"><span>Activities</span><b>{stats.activities}</b></div>
            <div className="overview-item"><span>Username</span><b>@{user?.username}</b></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
