import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MasterData() {
  const [cats, setCats] = useState([]);
  const [types, setTypes] = useState([]);
  const [factors, setFactors] = useState([]);
  const [catName, setCatName] = useState("");
  const [typeForm, setTypeForm] = useState({ categoryId: "", name: "", unit: "km" });
  const [facForm, setFacForm] = useState({ activityTypeId: "", factor: "", unit: "kg CO₂/km", source: "Admin" });

  const load = async () => {
    const [c, t, f] = await Promise.all([
      api.get("/categories"),
      api.get("/activity-types"),
      api.get("/emission-factors"),
    ]);
    setCats(c.data);
    setTypes(t.data);
    setFactors(f.data);
  };
  useEffect(() => { load(); }, []);

  return (
    <>
      <h1>Master management</h1>
      <p>Categories → Activity types → Emission factors. User add-activity reads this live.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <h3>Categories</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await api.post("/categories", { name: catName });
              setCatName("");
              load();
            }}
          >
            <input value={catName} onChange={(e) => setCatName(e.target.value)} placeholder="New category" required />
            <button className="btn" style={{ marginTop: 8 }}>Add</button>
          </form>
          <ul>{cats.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <h3>Activity types</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await api.post("/activity-types", typeForm);
              load();
            }}
          >
            <select value={typeForm.categoryId} onChange={(e) => setTypeForm({ ...typeForm, categoryId: e.target.value })} required>
              <option value="">Category</option>
              {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input placeholder="Name" value={typeForm.name} onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })} required />
            <input placeholder="Unit" value={typeForm.unit} onChange={(e) => setTypeForm({ ...typeForm, unit: e.target.value })} />
            <button className="btn" style={{ marginTop: 8 }}>Add</button>
          </form>
          <ul>{types.map((t) => <li key={t.id}>{t.name} ({t.unit})</li>)}</ul>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <h3>Emission factors</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await api.post("/emission-factors", facForm);
              load();
            }}
          >
            <select value={facForm.activityTypeId} onChange={(e) => setFacForm({ ...facForm, activityTypeId: e.target.value })} required>
              <option value="">Type</option>
              {types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <input placeholder="Factor" value={facForm.factor} onChange={(e) => setFacForm({ ...facForm, factor: e.target.value })} required />
            <button className="btn" style={{ marginTop: 8 }}>Add</button>
          </form>
          <ul>{factors.map((f) => <li key={f.id}>type {f.activityTypeId}: {f.factor}</li>)}</ul>
        </div>
      </div>
    </>
  );
}
