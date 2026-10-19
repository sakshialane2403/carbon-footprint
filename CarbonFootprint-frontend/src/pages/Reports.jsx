import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Reports.css";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

const PERIODS = [
  { label: "Today", value: "today" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "365 Days", value: "365d" },
  { label: "Total", value: "total" },
];

const Reports = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [period, setPeriod] = useState("total");
  const [data, setData] = useState({
    totalEmission: 0,
    activityCount: 0,
    ecoScore: 80,
    byCategory: {},
    monthly: [],
    activities: [],
  });

  useEffect(() => {
    if (!user?.userId) return;
    api.get("/reports/monthly", { params: { userId: user.userId, period } })
      .then((r) => setData(r.data || data))
      .catch(() => {});
  }, [user, period]);

  const reports = data.activities || [];
  const displayed = data.monthly?.length
    ? data.monthly
    : [{ month: "—", value: 0 }];
  const maxBar = Math.max(1, ...displayed.map((i) => Number(i.value) || 0));
  const totalEmissions = Number(data.totalEmission) || 0;
  const monthlyAverage = displayed.length
    ? displayed.reduce((s, i) => s + Number(i.value || 0), 0) / displayed.length
    : 0;
  const categoryData = useMemo(() => {
    const cats = data.byCategory || {};
    const entries = Array.isArray(cats)
      ? cats.map((c) => [c.name, c.value])
      : Object.entries(cats);
    const total = entries.reduce((s, [, v]) => s + Number(v), 0) || 1;
    return entries.map(([name, value]) => ({
      name,
      percentage: Math.round((Number(value) / total) * 100),
    }));
  }, [data]);

  const handleExport = () => {
    const csv = [["Activity", "Category", "Emission", "Date"], ...reports.map((r) => [r.activityName || r.activity, r.category, r.emission, r.date])].map((r) => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "carbon-report.csv";
    a.click();
  };

  return (
    <div className="reports-page">
      <div className="reports-container">
        <div className="reports-header">
          <div>
            <div className="reports-breadcrumb">Reports</div>
            <h1>Reports & Analytics</h1>
          </div>
          <button className="export-report-btn" onClick={handleExport}>↓ Export Report</button>
        </div>
        <div className="report-summary">
          <div className="report-card"><div className="report-card-icon green">🌱</div><div><p>Total Emissions</p><h2>{totalEmissions.toFixed(1)} kg</h2></div></div>
          <div className="report-card"><div className="report-card-icon blue">📊</div><div><p>Total Activities</p><h2>{data.activityCount || 0}</h2></div></div>
          <div className="report-card"><div className="report-card-icon orange">📅</div><div><p>Period Average</p><h2>{monthlyAverage.toFixed(1)} kg</h2></div></div>
          <div className="report-card"><div className="report-card-icon purple">⭐</div><div><p>Eco Performance</p><h2>{data.ecoScore || 0}/100</h2></div></div>
        </div>
        <div className="reports-grid">
          <div className="report-panel large-panel">
            <div className="panel-header">
              <h2>Carbon Emission Overview</h2>
              <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                {PERIODS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div className="chart-wrapper">
              <div className="chart-y-axis"><span>{Math.round(maxBar)}</span><span>{Math.round(maxBar / 2)}</span><span>0</span></div>
              <div className="chart-area">
                <div className="chart-bars">
                  {displayed.map((item) => (
                    <div className="chart-column" key={item.month}>
                      <div className="chart-bar" style={{ height: `${Math.min((Number(item.value) / maxBar) * 100, 100)}%` }}><span>{Number(item.value).toFixed(1)}</span></div>
                      <small>{String(item.month).slice(-5)}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="report-panel">
            <h2>Category Breakdown</h2>
            <div className="category-list">
              {categoryData.length ? categoryData.map((c) => (
                <div className="category-block" key={c.name}>
                  <div className="category-item"><span>{c.name}</span><strong>{c.percentage}%</strong></div>
                  <div className="progress-bar"><span style={{ width: `${c.percentage}%` }}></span></div>
                </div>
              )) : <p className="pro-muted">No data for this period.</p>}
            </div>
          </div>
        </div>
        <div className="report-panel recent-report">
          <div className="panel-header">
            <h2>Recent Activity Report</h2>
            <button className="view-all-btn" onClick={() => navigate("/activity-history")}>View All</button>
          </div>
          <div className="report-table">
            <div className="table-header"><span>Activity</span><span>Category</span><span>Emission</span><span>Date</span></div>
            {reports.slice(0, 8).map((r) => (
              <div className="table-row" key={r.id}>
                <span>{r.activityName || r.activity}</span>
                <span className="category-badge">{r.category}</span>
                <strong>{Number(r.emission).toFixed(1)} kg</strong>
                <span>{r.date}</span>
              </div>
            ))}
            {!reports.length && <div className="table-row"><span>No activities yet.</span></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
