import { useEffect, useState } from "react";
import "../css/ThemeToggle.css";

function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem("ct_theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", dark);
    document.body.classList.toggle("dark-mode", dark);
    localStorage.setItem("ct_theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button className="theme-btn" type="button" onClick={() => setDark((d) => !d)}>
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
