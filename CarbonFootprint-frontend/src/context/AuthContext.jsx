import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function normalizeRole(role) {
  return String(role || "")
    .replace(/^ROLE_/i, "")
    .trim()
    .toUpperCase();
}

function readUser() {
  try {
    const raw = localStorage.getItem("cft_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  const value = useMemo(
    () => ({
      user,
      login: (res) => {
        const u = {
          userId: res.userId,
          username: res.username,
          name: res.name,
          email: res.email,
          role: normalizeRole(res.role),
          mustResetPassword: !!res.firstLogin,
        };
        localStorage.setItem("cft_token", res.token || "");
        localStorage.setItem("cft_user", JSON.stringify(u));
        setUser(u);
        return u;
      },
      clearMustReset: () => {
        setUser((prev) => {
          if (!prev) return prev;
          const next = { ...prev, mustResetPassword: false };
          localStorage.setItem("cft_user", JSON.stringify(next));
          return next;
        });
      },
      logout: () => {
        localStorage.removeItem("cft_token");
        localStorage.removeItem("cft_user");
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext) || { user: null, login: () => {}, logout: () => {} };
}
