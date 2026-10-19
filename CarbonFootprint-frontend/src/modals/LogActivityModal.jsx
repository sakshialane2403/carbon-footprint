import { useMemo, useState } from "react";
import { useCarbon } from "../context/CarbonStore.jsx";

export default function LogActivityModal({ categoryId, onClose }) {
  const { categories, types, factorFor, logActivity } = useCarbon();
  const cat = categories.find((c) => c.id === categoryId);
  const list = types.filter((t) => t.categoryId === categoryId && t.status === "Active");
  const [typeId, setTypeId] = useState(list[0]?.id || "");
  const [value, setValue] = useState("");
  const [details, setDetails] = useState("");
  const [err, setErr] = useState("");
  const type = list.find((t) => t.id === typeId);
  const preview = useMemo(() => (type && value ? Number((Number(value) * factorFor(typeId)).toFixed(2)) : 0), [type, value, typeId, factorFor]);

  const save = () => {
    if (!typeId || !value) return setErr("Select activity type and enter a value.");
    logActivity({ categoryId, typeId, value, details });
    onClose();
  };

  return (
    <div className="master-modal-overlay" onClick={onClose}>
      <div className="master-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Log Activity</h2>
            <p>Record a {cat?.name?.toLowerCase()} activity</p>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div style={{ background: "#e8f7ed", padding: 12, borderRadius: 12, marginBottom: 14 }}>
          <strong>{cat?.name}</strong> — {cat?.description}
        </div>
        {err && <p className="activity-error">{err}</p>}
        <label className="form-group">Activity type *
          <select value={typeId} onChange={(e) => setTypeId(e.target.value)}>
            {list.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.unit})</option>)}
          </select>
        </label>
        <label className="form-group">Value ({type?.unit || "unit"}) *
          <input type="number" min="0" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
        <label className="form-group">Additional details
          <textarea value={details} onChange={(e) => setDetails(e.target.value)} />
        </label>
        {value && <p style={{ color: "#166534" }}>Estimated: {preview} kg CO₂ ({value} × {factorFor(typeId)})</p>}
        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="modal-save-btn" onClick={save}>Save Activity</button>
        </div>
      </div>
    </div>
  );
}
