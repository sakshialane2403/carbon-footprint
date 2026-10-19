import { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

function ResetPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, clearMustReset } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    setSubmitting(true);
    try {
      await resetPassword(user?.username, currentPassword, newPassword, confirmPassword);
      clearMustReset();
      navigate(user?.role === "ADMIN" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not reset password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="login">
      <div className="login-right" style={{ margin: "0 auto" }}>
        <h2>Set a new password</h2>
        <p>This is your first login. Choose a new password to continue.</p>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Temporary Password</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
          <label>Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="submit" disabled={submitting}>{submitting ? "Updating…" : "Update password"}</button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
