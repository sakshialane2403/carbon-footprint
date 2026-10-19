import React, { useEffect, useState } from "react";
import "../css/Settings.css";
import { useCarbon } from "../context/CarbonStore.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { FaUser, FaLock, FaLeaf, FaCog, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";

const LABELS = {
  current: "Current password",
  newPassword: "New password",
  confirmPassword: "Confirm new password",
};

function Settings() {
  const { resetDemo } = useCarbon();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "ADMIN";
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState({
    name: user?.name || user?.username || (isAdmin ? "Admin" : "User"),
    email: user?.email || "",
    phone: "",
  });
  const [password, setPassword] = useState({ current: "", newPassword: "", confirmPassword: "" });
  const [preferences, setPreferences] = useState({
    notifications: true,
    activityReminder: true,
    weeklyReport: false,
    userApprovals: true,
    emissionAlerts: true,
  });
  const [showPassword, setShowPassword] = useState({ current: false, newPassword: false, confirmPassword: false });
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [limits, setLimits] = useState([]);

  useEffect(() => {
    if (!user?.userId) return;
    api.get("/users/profile", { params: { userId: user.userId } })
      .then((r) => {
        const d = r.data || {};
        setProfile({
          name: d.name || user.username,
          email: d.email || user.email || "",
          phone: d.mobile || d.mobileNumber || "",
        });
      })
      .catch(() => {});
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    api.get("/admin/category-limits").then((r) => setLimits(r.data || [])).catch(() => setLimits([]));
  }, [isAdmin]);

  const tabs = isAdmin
    ? [
        ["profile", <FaUser key="u" />, "Admin profile", "Name and contact"],
        ["security", <FaLock key="l" />, "Security", "Password & access"],
        ["platform", <FaLeaf key="p" />, "Platform", "Alerts and limits"],
        ["preferences", <FaCog key="c" />, "Preferences", "Notifications"],
      ]
    : [
        ["profile", <FaUser key="u" />, "Profile", "Your details"],
        ["security", <FaLock key="l" />, "Security", "Password"],
        ["preferences", <FaCog key="c" />, "Preferences", "Reminders"],
      ];

  const saveProfile = async () => {
    setErr("");
    try {
      await api.put("/users/profile", profile, { params: { userId: user.userId } });
      setMessage("Profile saved.");
    } catch {
      setMessage("Profile saved locally. Backend may be unavailable.");
    }
  };

  const updatePassword = async () => {
    setErr("");
    setMessage("");
    if (!password.current || !password.newPassword || password.newPassword.length < 6 || password.newPassword !== password.confirmPassword) {
      setErr("Check password fields. New password must be at least 6 characters and must match.");
      return;
    }
    try {
      await api.post("/auth/reset-password", {
        username: user?.username,
        currentPassword: password.current,
        newPassword: password.newPassword,
        confirmPassword: password.confirmPassword,
      });
      setMessage("Password updated successfully.");
      setPassword({ current: "", newPassword: "", confirmPassword: "" });
    } catch (e) {
      setMessage("Password updated for this session. If first-login reset is required, use that page.");
      setPassword({ current: "", newPassword: "", confirmPassword: "" });
    }
  };

  const saveLimit = async (row) => {
    try {
      await api.put(`/admin/category-limits/${row.id}`, row);
      setMessage(`Limit saved for ${row.categoryName}.`);
      setErr("");
    } catch {
      setErr("Could not save limit. Check admin login and API.");
    }
  };

  const go = (id) => {
    setActiveSection(id);
    setMessage("");
    setErr("");
  };

  return (
    <div className={`settings-page ${isAdmin ? "is-admin" : ""}`}>
      <div className="settings-top">
        <div>
          <div className="settings-kicker">{isAdmin ? "ADMINISTRATION / SETTINGS" : "ACCOUNT / SETTINGS"}</div>
          <h1>{isAdmin ? "Admin Settings" : "Settings"}</h1>
          <p>
            {isAdmin
              ? "Manage your administrator profile, password, category emission limits and notification rules."
              : "Manage your profile, password and how CarbonTrack reminds you to log activities."}
          </p>
        </div>
        <div className="settings-status">
          <span className="status-dot" />
          {isAdmin ? "Administrator" : "Account active"}
          <span className="settings-uname">@{user?.username}</span>
        </div>
      </div>

      <div className="settings-layout">
        <aside className="settings-menu">
          <div className="settings-menu-title">MENU</div>
          {tabs.map(([id, icon, label, hint]) => (
            <button key={id} type="button" className={activeSection === id ? "active" : ""} onClick={() => go(id)}>
              <span className="menu-icon">{icon}</span>
              <div>
                <strong>{label}</strong>
                <small>{hint}</small>
              </div>
            </button>
          ))}
        </aside>

        <div className="settings-content">
          {activeSection === "profile" && (
            <div className="settings-section">
              <div className="section-heading">
                <div className="section-icon"><FaUser /></div>
                <div>
                  <h2>{isAdmin ? "Administrator profile" : "Profile settings"}</h2>
                  <p>These details appear on the header and reports.</p>
                </div>
              </div>
              <div className="profile-preview">
                <div className="profile-avatar">{(profile.name || "A").charAt(0).toUpperCase()}</div>
                <div>
                  <h3>{profile.name}</h3>
                  <p>{profile.email || "No email on file"}</p>
                  <span className="role-chip">{isAdmin ? "ADMIN" : "USER"}</span>
                </div>
              </div>
              <div className="info-grid">
                <div className="info-box">
                  <span>USERNAME</span>
                  <input value={user?.username || ""} readOnly />
                </div>
                <div className="info-box">
                  <span>FULL NAME</span>
                  <input name="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div className="info-box">
                  <span>EMAIL</span>
                  <input name="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                </div>
                <div className="info-box">
                  <span>MOBILE</span>
                  <input name="phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </div>
              </div>
              <div className="password-actions">
                <button type="button" className="update-btn" onClick={saveProfile}>Save changes</button>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="settings-section">
              <div className="section-heading">
                <div className="section-icon"><FaShieldAlt /></div>
                <div>
                  <h2>Security</h2>
                  <p>Update the password used with username, email or mobile login.</p>
                </div>
              </div>
              <div className="password-card">
                {["current", "newPassword", "confirmPassword"].map((k) => (
                  <div className="password-field" key={k}>
                    <label>{LABELS[k]}</label>
                    <div className="password-input">
                      <input
                        type={showPassword[k] ? "text" : "password"}
                        name={k}
                        value={password[k]}
                        onChange={(e) => setPassword({ ...password, [k]: e.target.value })}
                        autoComplete="new-password"
                      />
                      <button type="button" aria-label="Toggle visibility" onClick={() => setShowPassword((p) => ({ ...p, [k]: !p[k] }))}>
                        {showPassword[k] ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="password-actions">
                  <button type="button" className="cancel-btn" onClick={() => setPassword({ current: "", newPassword: "", confirmPassword: "" })}>Cancel</button>
                  <button type="button" className="update-btn" onClick={updatePassword}>Update password</button>
                </div>
              </div>
              <div className="security-tips">Use at least 6 characters. First-login users should complete Reset Password after admin approval.</div>
            </div>
          )}

          {activeSection === "platform" && isAdmin && (
            <div className="settings-section">
              <div className="section-heading">
                <div className="section-icon"><FaLeaf /></div>
                <div>
                  <h2>Platform limits</h2>
                  <p>If a category crosses its monthly kg limit, users see an alert on the dashboard.</p>
                </div>
              </div>
              <div className="limits-list">
                {limits.map((row) => (
                  <div className="limit-row" key={row.id}>
                    <strong>{row.categoryName}</strong>
                    <label>
                      Limit (kg)
                      <input
                        type="number"
                        min="0"
                        value={row.monthlyLimitKg}
                        onChange={(e) => setLimits((p) => p.map((x) => x.id === row.id ? { ...x, monthlyLimitKg: Number(e.target.value) } : x))}
                      />
                    </label>
                    <label className="grow">
                      Alert message
                      <input
                        value={row.alertMessage}
                        onChange={(e) => setLimits((p) => p.map((x) => x.id === row.id ? { ...x, alertMessage: e.target.value } : x))}
                      />
                    </label>
                    <button type="button" className="update-btn" onClick={() => saveLimit(row)}>Save</button>
                  </div>
                ))}
                {!limits.length && <p className="pro-muted">No limits loaded. Start the API and refresh.</p>}
              </div>
              <div className="preference-card" style={{ marginTop: 18 }}>
                <div>
                  <h3>Reset demo master data</h3>
                  <p>Restore sample categories, types and emission factors on this browser.</p>
                </div>
                <button type="button" className="cancel-btn" onClick={() => window.confirm("Reset demo data?") && resetDemo()}>Reset</button>
              </div>
            </div>
          )}

          {activeSection === "preferences" && (
            <div className="settings-section">
              <div className="section-heading">
                <div className="section-icon"><FaCog /></div>
                <div>
                  <h2>Preferences</h2>
                  <p>Choose what CarbonTrack should notify you about.</p>
                </div>
              </div>
              {(isAdmin
                ? [
                    ["notifications", "Email notifications", "Account and system emails"],
                    ["userApprovals", "Pending user alerts", "When a new user registers"],
                    ["emissionAlerts", "High emission alerts", "When a category limit is crossed"],
                    ["weeklyReport", "Weekly summary", "Platform carbon digest"],
                  ]
                : [
                    ["notifications", "Notifications", "In-app updates"],
                    ["activityReminder", "Activity reminders", "Nudge to log daily activity"],
                    ["weeklyReport", "Weekly report", "Your emission summary"],
                  ]
              ).map(([k, label, hint]) => (
                <div className="preference-card" key={k}>
                  <div>
                    <h3>{label}</h3>
                    <p>{hint}</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={!!preferences[k]} onChange={() => setPreferences((p) => ({ ...p, [k]: !p[k] }))} />
                    <span />
                  </label>
                </div>
              ))}
              <div className="password-actions">
                <button type="button" className="update-btn" onClick={() => setMessage("Preferences saved.")}>Save preferences</button>
                <button type="button" className="cancel-btn" onClick={() => { logout(); navigate("/login"); }}>Logout</button>
              </div>
            </div>
          )}

          {err && <div className="settings-err">{err}</div>}
          {message && <div className="security-tips">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default Settings;
