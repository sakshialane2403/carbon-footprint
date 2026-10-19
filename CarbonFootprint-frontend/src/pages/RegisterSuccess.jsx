import { useLocation, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { FaLeaf, FaCopy, FaCheck } from "react-icons/fa";
import "../css/Login.css";

export default function RegisterSuccess() {
  const location = useLocation();
  const username = location.state?.username;
  const email = location.state?.email;
  const [copied, setCopied] = useState(false);

  if (!username) return <Navigate to="/register" replace />;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(username);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="login" style={{ gridTemplateColumns: "1fr" }}>
      <div className="login-right" style={{ maxWidth: 480 }}>
        <div className="login-home" style={{ display: "flex", alignItems: "center", gap: 8, color: "#16a34a" }}>
          <FaLeaf /> CarbonTrack
        </div>
        <h2>You're almost in</h2>
        <p>Registration successful. Save your username — you will need it to sign in after admin approval.</p>

        <div className="login-username-hint" style={{ textAlign: "center", padding: 22 }}>
          <div style={{ fontSize: 12, letterSpacing: ".12em", fontWeight: 700, color: "#3f6212", marginBottom: 8 }}>YOUR USERNAME</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#14532d", letterSpacing: "-0.03em" }}>@{username}</div>
          <button type="button" className="oauth-btn" style={{ marginTop: 14, width: "100%" }} onClick={copy}>
            {copied ? <><FaCheck /> Copied</> : <><FaCopy /> Copy username</>}
          </button>
        </div>

        {email && (
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>
            A confirmation email was sent to <strong>{email}</strong>. Admin will review your request. After approval you can login with this username, your email or mobile.
          </p>
        )}

        <Link to="/login" state={{ username }} className="login-submit" style={{ display: "block", textAlign: "center", textDecoration: "none", marginTop: 8 }}>
          Continue to login
        </Link>
      </div>
    </section>
  );
}
