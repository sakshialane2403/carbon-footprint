import React, { useMemo, useState } from "react";
import "../css/ActivityLogging.css";
import { useCarbon } from "../context/CarbonStore.jsx";
import { addActivity } from "../services/activityService.js";

function ActivityLogging() {
  const { categories, types, logs, factorFor, logActivity, updateLog, deleteLog } = useCarbon();
  const [form, setForm] = useState({
    categoryId: "", typeId: "", quantity: "",
    date: new Date().toISOString().split("T")[0], notes: "",
  });
  const [editingId, setEditingId] = useState(null);

  const activeCats = categories.filter((c) => c.status === "Active");
  const typeList = types.filter((t) => t.categoryId === form.categoryId && t.status === "Active");
  const selected = types.find((t) => t.id === form.typeId);
  const factor = form.typeId ? factorFor(form.typeId) : 0;
  const preview = selected && form.quantity ? Number((Number(form.quantity) * factor).toFixed(2)) : 0;

  const resetForm = () => {
    setForm({ categoryId: "", typeId: "", quantity: "", date: new Date().toISOString().split("T")[0], notes: "" });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.categoryId || !form.typeId || !form.quantity || !form.date) {
      alert("Please fill all required fields.");
      return;
    }
    if (!factor) {
      alert("No emission factor for this activity. Ask admin to add one.");
      return;
    }
    if (editingId) {
      updateLog(editingId, { categoryId: form.categoryId, typeId: form.typeId, value: form.quantity, details: form.notes, date: form.date });
    } else {
      logActivity({ categoryId: form.categoryId, typeId: form.typeId, value: form.quantity, details: form.notes, date: form.date });
      const typeName = types.find((t) => t.id === form.typeId)?.name;
      addActivity({
        activity: typeName,
        activityName: typeName,
        category: categories.find((c) => c.id === form.categoryId)?.name,
        quantity: Number(form.quantity),
        date: form.date,
        notes: form.notes,
      }).catch(() => {});
    }
    resetForm();
  };

  const catName = (id) => categories.find((c) => c.id === id)?.name || "—";
  const typeName = (id) => types.find((t) => t.id === id)?.name || "—";
  const totalEmission = useMemo(() => logs.reduce((t, i) => t + Number(i.emission), 0), [logs]);

  return (
    <div className="activity-logging-page">
      <div className="activity-page-header">
        <div>
          <div className="activity-breadcrumb">User <span>›</span> Activity Logging</div>
          <h1>Activity Logging</h1>
        </div>
        <div className="activity-total-card">
          <span>Total Recorded Emission</span>
          <strong>{totalEmission.toFixed(2)}</strong>
          <small>kg CO₂e</small>
        </div>
      </div>
      <div className="activity-form-card">
        <h2>{editingId ? "Update Activity" : "Add New Activity"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="activity-form-grid">
            <div className="activity-input-group">
              <label>Category *</label>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value, typeId: "" })}>
                <option value="">Select Category</option>
                {activeCats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="activity-input-group">
              <label>Activity *</label>
              <select value={form.typeId} onChange={(e) => setForm({ ...form, typeId: e.target.value })} disabled={!form.categoryId}>
                <option value="">Select Activity</option>
                {typeList.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="activity-input-group">
              <label>Quantity *</label>
              <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} min="0" step="0.01" />
            </div>
            <div className="activity-input-group">
              <label>Unit</label>
              <input value={selected?.unit || ""} readOnly />
            </div>
            <div className="activity-input-group">
              <label>Date *</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="activity-input-group activity-full">
              <label>Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="3" />
            </div>
          </div>
          {form.typeId && form.quantity && (
            <div className="emission-preview">
              <div>Estimated: {Number(form.quantity)} × {factor}</div>
              <strong>{preview.toFixed(2)} kg CO₂e</strong>
            </div>
          )}
          <div className="activity-form-actions">
            <button type="button" className="activity-secondary-btn" onClick={resetForm}>Clear</button>
            <button type="submit" className="activity-primary-btn">{editingId ? "Update Activity" : "+ Add Activity"}</button>
          </div>
        </form>
      </div>
      <div className="activity-history-card">
        <div className="activity-history-header">
          <h2>Activity History</h2>
          <div className="history-count">{logs.length} Activities</div>
        </div>
        <table className="activity-table">
          <thead>
            <tr><th>#</th><th>Date</th><th>Category</th><th>Activity</th><th>Qty</th><th>Factor</th><th>Emission</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {logs.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td><span className="history-category">{catName(item.categoryId)}</span></td>
                <td>{typeName(item.typeId)}</td>
                <td>{item.value} {item.unit}</td>
                <td>{item.factor}</td>
                <td>{Number(item.emission).toFixed(2)}</td>
                <td>
                  <button className="history-edit" onClick={() => {
                    setForm({ categoryId: item.categoryId, typeId: item.typeId, quantity: item.value, date: item.date, notes: item.details || "" });
                    setEditingId(item.id);
                  }}>Edit</button>
                  <button className="history-delete" onClick={() => window.confirm("Delete?") && deleteLog(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivityLogging;
