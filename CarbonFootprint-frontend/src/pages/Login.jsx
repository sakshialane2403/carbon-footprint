import { useState } from "react";
import "../css/Login.css";
import loginImg from "../assets/Login.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser, oauthLogin } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";
import { FaEye, FaEyeSlash, FaLeaf, FaGoogle, FaGithub } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const registeredUser = location.state?.username;

  const afterLogin = (res) => {
    const u = login(res);
    const path = u.mustResetPassword ? "/reset-password" : u.role === "ADMIN" ? "/admin" : "/dashboard";
    setTimeout(() => navigate(path), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      afterLogin(await loginUser(username, password));
    } catch (err) {
      const status = err.response?.status;
      const d = err.response?.data;
      const apiMsg = (d && typeof d === "object" && (d.message || d.error)) || "";
      if (!err.response || status === 502 || status === 504) {
        setError("Backend not running. Start Spring Boot on port 9090, then try again.");
      } else if (apiMsg) {
        setError(String(apiMsg));
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const social = async (provider) => {
    setError("");
    try {
      afterLogin(await oauthLogin(provider));
    } catch {
      setError(`${provider} login failed`);
    }
  };

  return (
    <section className="login">
      <div className="login-left">
        <div className="login-brand">
          <FaLeaf />
          <span>CarbonTrack</span>
        </div>
        <img src={loginImg} alt="Track your carbon footprint" />
        <div className="login-left-copy">
          <h3>Track today. Save tomorrow.</h3>
          <p>Monitor activities, calculate emissions and meet your sustainability goals.</p>
        </div>
      </div>
      <div className="login-right">
        <Link to="/" className="login-home">Back to home</Link>
        <h2>Sign in</h2>
        <p>Use your username, email or mobile number.</p>
        {registeredUser && (
          <p className="login-username-hint">
            Username created: <strong>{registeredUser}</strong>
            <span> Admin approval is required before you can sign in.</span>
          </p>
        )}
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="login-id">Username, email or mobile</label>
          <input
            id="login-id"
            type="text"
            placeholder="Username, email or mobile number"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <label htmlFor="login-pass">Password</label>
          <div className="password-wrap">
            <input
              id="login-pass"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="login-options">
            <label className="remember"><input type="checkbox" /> Remember me</label>
            <Link to="/reset-password">Forgot password?</Link>
          </div>
          <button type="submit" className="login-submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <div className="oauth-divider"><span>or</span></div>
        <div className="oauth-row">
          <button type="button" className="oauth-btn" onClick={() => social("GOOGLE")}>
            <FaGoogle /> Google
          </button>
          <button type="button" className="oauth-btn gh" onClick={() => social("GITHUB")}>
            <FaGithub /> GitHub
          </button>
        </div>
        <p className="register-text">New to CarbonTrack? <Link to="/register">Create an account</Link></p>
      </div>
    </section>
  );
}

export default Login;
