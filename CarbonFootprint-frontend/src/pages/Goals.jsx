import React, { useEffect, useMemo, useState } from "react";
import "../css/Goals.css";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Goals = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");
  const [goals, setGoals] = useState([]);
  const [targetKg, setTargetKg] = useState("100");
  const month = new Date().toISOString().slice(0, 7);

  const load = () => {
    if (!user?.userId) return;
    api.get("/goals", { params: { userId: user.userId } })
      .then((r) => setGoals(Array.isArray(r.data) ? r.data : []))
      .catch(() => setGoals([]));
  };

  useEffect(() => { load(); }, [user]);

  const mapped = goals.map((g) => ({
    id: g.id,
    title: g.title || "Monthly carbon target",
    description: `Month ${g.month}. Emission = quantity × factor.`,
    category: "Carbon",
    target: `${g.targetKg} kg`,
    current: `${g.used ?? 0} kg`,
    progress: Number(g.percent || 0),
    deadline: g.month,
    icon: "🌱",
    status: g.status || "In Progress",
    owner: user?.username,
  }));

  const filteredGoals = useMemo(
    () => (activeFilter === "All" ? mapped : mapped.filter((g) => g.status === activeFilter)),
    [mapped, activeFilter]
  );
  const overallProgress = mapped.length
    ? Math.round(mapped.reduce((s, g) => s + Number(g.progress), 0) / mapped.length)
    : 0;

  const createGoal = async () => {
    const kg = Number(targetKg);
    if (!kg || !user?.userId) return;
    await api.post("/goals", { userId: user.userId, month, targetKg: kg, title: "Reduce Monthly Carbon Emissions" });
    load();
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <div>
          <div className="page-label">GOALS / TARGETS</div>
          <h1>Goals Management</h1>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="number" min="1" value={targetKg} onChange={(e) => setTargetKg(e.target.value)} style={{ width: 90, padding: 8, borderRadius: 8, border: "1px solid #ddd" }} />
          <button className="add-goal-btn" onClick={createGoal}>+ Set {month} target (kg)</button>
        </div>
      </div>
      <div className="goals-overview">
        <div className="goal-stat"><div className="goal-stat-icon green">🎯</div><div><span>Total Goals</span><strong>{mapped.length}</strong></div></div>
        <div className="goal-stat"><div className="goal-stat-icon blue">🚀</div><div><span>Active</span><strong>{mapped.filter((g) => g.status === "In Progress").length}</strong></div></div>
        <div className="goal-stat"><div className="goal-stat-icon purple">✓</div><div><span>Completed</span><strong>{mapped.filter((g) => g.status === "Completed").length}</strong></div></div>
        <div className="goal-stat"><div className="goal-stat-icon orange">📈</div><div><span>Overall</span><strong>{overallProgress}%</strong></div></div>
      </div>
      <div className="overall-goal-card">
        <div><h2>Overall Goal Progress</h2></div>
        <div className="overall-progress">
          <div className="overall-progress-top"><span>Used vs monthly target</span><strong>{overallProgress}%</strong></div>
          <div className="overall-progress-bar"><span style={{ width: `${overallProgress}%` }}></span></div>
        </div>
      </div>
      <div className="goals-section-header">
        <h2>All Sustainability Goals</h2>
        <div className="goal-filters">
          {["All", "In Progress", "Completed"].map((f) => (
            <button key={f} className={activeFilter === f ? "active" : ""} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
        </div>
      </div>
      <div className="goals-grid">
        {filteredGoals.map((goal) => (
          <div className="goal-card" key={goal.id}>
            <div className="goal-card-top">
              <div className="goal-icon">{goal.icon}</div>
              <span className={goal.status === "Completed" ? "goal-status completed" : "goal-status"}>{goal.status}</span>
            </div>
            <span className="goal-category">{goal.category}</span>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <div className="goal-values">
              <div><span>Current</span><strong>{goal.current}</strong></div>
              <div><span>Target</span><strong>{goal.target}</strong></div>
            </div>
            <div className="goal-progress-section">
              <div className="goal-progress-info"><span>Progress</span><strong>{goal.progress}%</strong></div>
              <div className="goal-progress-bar"><span style={{ width: `${goal.progress}%` }}></span></div>
            </div>
            <div className="goal-card-footer">
              <span>📅 {goal.deadline}</span>
              <div className="goal-actions">
                <button onClick={async () => { if (window.confirm("Delete?")) { await api.delete(`/goals/${goal.id}`); load(); } }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
