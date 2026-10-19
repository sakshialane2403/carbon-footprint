import { useState } from "react";
import { useCarbon } from "../../context/CarbonStore.jsx";

export default function EmissionFactorsPage() {
  const { factors, types, addFactor, updateFactor, deleteFactor } = useCarbon();
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null);
  const blank = { typeId: types[0]?.id, factor: "", unit: "kg CO₂/km", status: "Active", source: "", version: "", from: "", to: "", remarks: "" };
  const [form, setForm] = useState(blank);
  const tName = (id) => types.find((t) => t.id === id)?.name || id;
  const rows = factors.filter((f) => tName(f.typeId).toLowerCase().includes(q.toLowerCase()) || (f.source || "").toLowerCase().includes(q.toLowerCase()));

  const save = () => {
    if (!form.typeId || !form.factor || !form.unit || !form.source || !form.from) return alert("Fill required fields.");
    if (modal === "edit") updateFactor(form.id, form);
    else addFactor(form);
    setModal(null);
  };

  return (
    <div className="master-page">
      <div className="master-header">
        <h1>Emission Factors</h1>
        <button className="add-master-btn" onClick={() => { setForm(blank); setModal("add"); }}>+ Add emission factor</button>
      </div>
      <div className="master-search" style={{ marginBottom: 12 }}><input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div className="master-card" style={{ overflowX: "auto" }}>
        <table className="master-table">
          <thead>
            <tr>
              <th>Activity Type</th><th>Factor</th><th>Unit</th><th>Source</th><th>Version</th>
              <th>From</th><th>To</th><th>Remarks</th><th>Created By</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.id}>
                <td>{tName(f.typeId)}</td><td>{f.factor}</td><td>{f.unit}</td><td>{f.source}</td><td>{f.version}</td>
                <td>{f.from}</td><td>{f.to || "—"}</td><td>{f.remarks || "—"}</td><td>{f.createdBy}</td><td>{f.status}</td>
                <td>
                  <button className="edit-master-btn" onClick={() => { setForm(f); setModal("edit"); }}>Edit</button>
                  <button className="delete-master-btn" onClick={() => window.confirm("Delete factor?") && deleteFactor(f.id)}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="master-modal-overlay" onClick={() => setModal(null)}>
          <div className="master-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modal === "edit" ? "Edit" : "Add"} emission factor</h2>
            <label className="form-group">Activity type *
              <select value={form.typeId} onChange={(e) => setForm({ ...form, typeId: e.target.value })}>
                {types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </label>
            <label className="form-group">Emission factor *<input type="number" step="0.0001" value={form.factor} onChange={(e) => setForm({ ...form, factor: e.target.value })} /></label>
            <label className="form-group">Unit *<input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></label>
            <label className="form-group">Status *<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>Inactive</option></select></label>
            <label className="form-group">Source name *<input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} /></label>
            <label className="form-group">Source version<input value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} /></label>
            <label className="form-group">Effective from *<input type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} /></label>
            <label className="form-group">Effective to<input type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} /></label>
            <label className="form-group">Remarks<textarea value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} /></label>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setModal(null)}>Cancel</button>
              <button className="modal-save-btn" onClick={save}>Create emission factor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
