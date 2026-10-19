import { useEffect, useState } from "react";
import "../css/GoalProgress.css";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

function GoalProgress() {
  const { user } = useAuth();
  const [p, setP] = useState({ percent: 0, used: 0, target: 100 });

  useEffect(() => {
    if (!user?.userId) return;
    api.get("/goals/progress", { params: { userId: user.userId } })
      .then((r) => setP(r.data || p))
      .catch(() => {});
  }, [user]);

  const deg = Math.round((Number(p.percent) || 0) * 3.6);

  return (
    <div className="goal-card">
      <h2>Monthly goal</h2>
      <div className="circle" style={{ background: `conic-gradient(#16a34a 0deg ${deg}deg, #e8eee9 ${deg}deg 360deg)` }}>
        <div className="inner-circle"><h1>{p.percent || 0}%</h1></div>
      </div>
      <p>You used {p.used || 0} kg of {p.target || 100} kg CO₂e this month.</p>
    </div>
  );
}

export default GoalProgress;
