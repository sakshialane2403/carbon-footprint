import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function OAuthCallback() {
  const [params] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    login({
      token,
      userId: Number(params.get("userId")),
      username: params.get("username"),
      role: params.get("role") || "USER",
      name: params.get("username"),
      firstLogin: false,
    });
    navigate("/dashboard", { replace: true });
  }, [params, login, navigate]);

  return <p style={{ padding: 40 }}>Signing you in…</p>;
}
