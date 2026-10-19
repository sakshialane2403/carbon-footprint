import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ActivityHistory.css";
import { deleteActivity, listActivities } from "../services/activityService.js";

function ActivityHistory() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const load = () => {
    listActivities().then(setLogs).catch(() => setLogs([]));
  };
  useEffect(() => { load(); }, []);

  const cats = [...new Set(logs.map((a) => a.category).filter(Boolean))];

  const filtered = useMemo(() => {
    return logs.filter((a) => {
      const q = search.toLowerCase();
      const matchQ = `${a.activityName} ${a.category} ${a.note || ""}`.toLowerCase().includes(q);
      const matchC = categoryFilter === "All" || a.category === categoryFilter;
      const matchD = !dateFilter || a.date === dateFilter;
      return matchQ && matchC && matchD;
    });
  }, [logs, search, categoryFilter, dateFilter]);

  const totalEmission = logs.reduce((t, a) => t + Number(a.emission), 0);
  const displayed = filtered.reduce((t, a) => t + Number(a.emission), 0);

  const remove = async (id) => {
    if (!window.confirm("Delete?")) return;
    await deleteActivity(id);
    load();
  };

  return (
    <div className="activity-history-page">
      <div className="activity-history-container">
        <div className="history-header">
          <div>
            <span className="history-breadcrumb">Activities</span>
            <h1>Activity History</h1>
            <p>Search by date or category. Emission = quantity × factor.</p>
          </div>
          <button className="add-history-btn" onClick={() => navigate("/activity")}>+ Add Activity</button>
        </div>
        <div className="history-summary">
          <div className="history-summary-card"><div><span>Total Activities</span><strong>{logs.length}</strong></div></div>
          <div className="history-summary-card"><div><span>Total Emission</span><strong>{totalEmission.toFixed(2)} kg</strong></div></div>
          <div className="history-summary-card"><div><span>Displayed</span><strong>{displayed.toFixed(2)} kg</strong></div></div>
        </div>
        <div className="history-filter-card">
          <div className="filter-controls">
            <div className="history-search"><input placeholder="Search activity or notes..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option>All</option>
              {cats.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            <button className="clear-filter-btn" onClick={() => { setSearch(""); setCategoryFilter("All"); setDateFilter(""); }}>Clear</button>
          </div>
        </div>
        <div className="history-table-card">
          <div className="history-table-wrapper">
            <table>
              <thead>
                <tr><th>#</th><th>Date</th><th>Activity</th><th>Category</th><th>Qty</th><th>Emission</th><th></th></tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr key={a.id}>
                    <td>{i + 1}</td>
                    <td>{a.date}</td>
                    <td>{a.activityName}</td>
                    <td><span className="category-badge">{a.category}</span></td>
                    <td>{a.quantity} {a.unit}</td>
                    <td><strong className="emission-value">{Number(a.emission).toFixed(2)}</strong></td>
                    <td><button className="history-delete-btn" onClick={() => remove(a.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityHistory;
