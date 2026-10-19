import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddActivity.css";
import { addActivity } from "../services/activityService.js";

function AddActivity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "", activity: "", quantity: "", unit: "",
    activityDate: new Date().toISOString().split("T")[0], notes: "",
  });
  const [emission, setEmission] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const activityData = {
    Car: { category: "Transport", unit: "km", factor: 0.21 },
    Bus: { category: "Transport", unit: "km", factor: 0.08 },
    Flight: { category: "Transport", unit: "km", factor: 0.25 },
    Electricity: { category: "Electricity", unit: "kWh", factor: 0.82 },
    "Veg Meal": { category: "Food", unit: "meal", factor: 0.70 },
    "Chicken Meal": { category: "Food", unit: "meal", factor: 2.50 },
    Electronics: { category: "Shopping", unit: "item", factor: 0.50 },
    Clothes: { category: "Shopping", unit: "item", factor: 0.50 },
  };
  const categories = ["Transport", "Electricity", "Food", "Shopping"];
  const activitiesByCategory = {
    Transport: ["Car", "Bus", "Flight"],
    Electricity: ["Electricity"],
    Food: ["Veg Meal", "Chicken Meal"],
    Shopping: ["Electronics", "Clothes"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    if (name === "activity") {
      const selected = activityData[value];
      setFormData((prev) => ({ ...prev, activity: value, category: selected.category, unit: selected.unit }));
      return;
    }
    if (name === "category") {
      setFormData((prev) => ({ ...prev, category: value, activity: "", unit: "" }));
      setEmission(null);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateEmission = () => {
    if (!formData.activity || !formData.quantity) {
      setError("Please select an activity and enter quantity.");
      return;
    }
    const selected = activityData[formData.activity];
    setEmission({ total: (Number(formData.quantity) * selected.factor).toFixed(2) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.activity || !formData.quantity || !formData.activityDate) {
      setError("Please fill all required fields.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const saved = await addActivity({
        category: formData.category,
        activity: formData.activity,
        activityName: formData.activity,
        quantity: Number(formData.quantity),
        unit: formData.unit,
        date: formData.activityDate,
        notes: formData.notes,
      });
      setEmission({ total: saved.emission });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save activity. Check login and backend.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-activity-page">
      <div className="add-activity-container">
        <div className="activity-page-header">
          <div>
            <span className="activity-breadcrumb">Dashboard › Add Activity</span>
            <h1>Add Activity</h1>
          </div>
        </div>
        <div className="activity-card">
          {error && <div className="activity-error">⚠️ {error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="activity-form-grid">
              <div className="activity-input-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="activity-input-group">
                <label>Activity Type *</label>
                <select name="activity" value={formData.activity} onChange={handleChange} required disabled={!formData.category}>
                  <option value="">Select Activity</option>
                  {formData.category && activitiesByCategory[formData.category].map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="activity-input-group">
                <label>Quantity *</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="0" step="0.01" required />
              </div>
              <div className="activity-input-group">
                <label>Unit</label>
                <input value={formData.unit} readOnly />
              </div>
              <div className="activity-input-group">
                <label>Date *</label>
                <input type="date" name="activityDate" value={formData.activityDate} onChange={handleChange} required />
              </div>
              <div className="activity-input-group full-width">
                <label>Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" />
              </div>
            </div>
            {emission && (
              <div className="emission-result">
                <div><span>Carbon emission</span><strong>{emission.total} kg CO₂e</strong></div>
              </div>
            )}
            <div className="activity-form-actions">
              <button type="button" className="activity-cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button>
              <button type="button" className="activity-calculate-btn" onClick={calculateEmission}>Calculate Emission</button>
              <button type="submit" className="activity-save-btn" disabled={saving}>{saving ? "Saving…" : "Save Activity"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddActivity;
