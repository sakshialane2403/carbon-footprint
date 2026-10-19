import { useMemo, useState } from "react";
import { useCarbon } from "../../context/CarbonStore.jsx";

export default function ActivityTypesPage() {
  const { types, categories, addType, updateType } = useCarbon();
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ categoryId: "", name: "", description: "", unit: "km", min: 0, max: 100, status: "Active" });
  const rows = useMemo(() => types.filter((t) => t.name.toLowerCase().includes(q.toLowerCase())), [types, q]);
  const catName = (id) => categories.find((c) => c.id === id)?.name || "—";

  return (
    <div className="master-page">
      <div className="master-header">
        <h1>Activity Types</h1>
        <button className="add-master-btn" onClick={() => { setForm({ categoryId: categories[0]?.id, name: "", description: "", unit: "km", min: 0, max: 100, status: "Active" }); setModal("add"); }}>+ Add Activity Type</button>
      </div>
      <div className="master-search" style={{ marginBottom: 12 }}><input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div className="master-card">
        <table className="master-table">
          <thead><tr><th>Activity</th><th>Category</th><th>Unit</th><th>Range</th><th>Status</th><th>Created</th><th></th></tr></thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td><td>{catName(t.categoryId)}</td><td>{t.unit}</td><td>{t.min}–{t.max}</td>
                <td>{t.status}</td><td>{t.created}</td>
                <td><button className="edit-master-btn" onClick={() => { setForm(t); setModal("edit"); }}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="master-modal-overlay" onClick={() => setModal(null)}>
          <div className="master-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modal === "edit" ? "Edit" : "Add"} activity type</h2>
            <label className="form-group">Category
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            {["name", "description", "unit"].map((k) => (
              <label key={k} className="form-group">{k}<input value={form[k] || ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })} /></label>
            ))}
            <div className="form-row">
              <label className="form-group">Min<input type="number" value={form.min} onChange={(e) => setForm({ ...form, min: e.target.value })} /></label>
              <label className="form-group">Max<input type="number" value={form.max} onChange={(e) => setForm({ ...form, max: e.target.value })} /></label>
            </div>
            <label className="form-group">Status
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option>Active</option><option>Inactive</option>
              </select>
            </label>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setModal(null)}>Cancel</button>
              <button className="modal-save-btn" onClick={() => {
                if (modal === "edit") updateType(form.id, form);
                else addType({ ...form, code: (form.name || "X").slice(0, 3).toUpperCase() });
                setModal(null);
              }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
