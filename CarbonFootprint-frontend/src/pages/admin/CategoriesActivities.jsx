import { useState } from "react";
import { useCarbon } from "../../context/CarbonStore.jsx";

export default function CategoriesActivities() {
  const { categories, types, addCategory, addType, updateCategory } = useCarbon();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState({});
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", code: "", description: "", unit: "km" });

  const filtered = categories.filter((c) =>
    `${c.name} ${c.code}`.toLowerCase().includes(q.toLowerCase()) ||
    types.some((t) => t.categoryId === c.id && t.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="master-page">
      <div className="master-header">
        <div>
          <h1>Categories & activity types</h1>
          <p>Browse emission categories and the activity types logged under each.</p>
        </div>
        <button className="add-master-btn" onClick={() => { setForm({ name: "", code: "", description: "" }); setModal("cat"); }}>+ Add Category</button>
      </div>
      <div className="master-summary">
        <div className="master-stat-card"><div><span>Categories</span><strong>{categories.length}</strong></div></div>
        <div className="master-stat-card"><div><span>Activity Types</span><strong>{types.length}</strong></div></div>
      </div>
      <div className="master-search" style={{ marginBottom: 16, width: "100%", maxWidth: 360 }}>
        <input placeholder="Search categories or activity types" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {filtered.map((c) => {
        const kids = types.filter((t) => t.categoryId === c.id);
        return (
          <div className="master-card" key={c.id} style={{ marginBottom: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{c.name}</strong> <span className="unit-badge">{c.code}</span>{" "}
                <span className="status-badge">{c.status}</span>
                <p>{c.description} · {kids.length} activities</p>
              </div>
              <div>
                <button className="btn ghost sm" onClick={() => setOpen((o) => ({ ...o, [c.id]: !o[c.id] }))}>{open[c.id] ? "Hide" : "Expand"}</button>{" "}
                <button className="btn ghost sm" onClick={() => { setForm(c); setModal("editCat"); }}>Edit</button>{" "}
                <button className="btn sm" onClick={() => { setForm({ name: "", code: "", description: "", unit: "km", categoryId: c.id }); setModal("act"); }}>+ Activity</button>
              </div>
            </div>
            {open[c.id] && (
              <table className="master-table" style={{ marginTop: 12 }}>
                <thead><tr><th>Code</th><th>Activity</th><th>Unit</th><th>Range</th><th>Status</th></tr></thead>
                <tbody>
                  {kids.map((t) => (
                    <tr key={t.id}>
                      <td>{t.code}</td><td>{t.name}<div style={{ color: "#7b8780" }}>{t.description}</div></td>
                      <td>{t.unit}</td><td>{t.min}–{t.max}</td><td>{t.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
      {modal && (
        <div className="master-modal-overlay" onClick={() => setModal(null)}>
          <div className="master-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modal === "act" ? "Add activity" : modal === "editCat" ? "Edit category" : "Add category"}</h2>
            <label className="form-group">Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            {modal !== "act" && <label className="form-group">Code<input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></label>}
            <label className="form-group">Description<textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
            {modal === "act" && <label className="form-group">Unit<input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></label>}
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setModal(null)}>Cancel</button>
              <button className="modal-save-btn" onClick={() => {
                if (modal === "cat") addCategory(form);
                if (modal === "editCat") updateCategory(form.id, form);
                if (modal === "act") addType({ ...form, categoryId: form.categoryId, code: (form.name || "ACT").slice(0, 3).toUpperCase(), min: 0, max: 1000 });
                setModal(null);
              }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
