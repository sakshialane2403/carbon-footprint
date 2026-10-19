import React, { useMemo, useState } from "react";
import { FaPlus, FaSearch, FaTrash, FaLeaf, FaBolt, FaCar } from "react-icons/fa";
import "../css/MasterManagement.css";
import { useCarbon } from "../context/CarbonStore.jsx";

const PAGE_SIZE = 5;

function paginate(list, page) {
  const total = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const p = Math.min(page, total);
  const start = (p - 1) * PAGE_SIZE;
  return { rows: list.slice(start, start + PAGE_SIZE), total, page: p };
}

function Pager({ page, total, onChange }) {
  if (total <= 1) return null;
  return (
    <div className="master-pager">
      <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}>Prev</button>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button type="button" key={n} className={n === page ? "on" : ""} onClick={() => onChange(n)}>{n}</button>
      ))}
      <button type="button" disabled={page >= total} onClick={() => onChange(page + 1)}>Next</button>
    </div>
  );
}

function MasterManagement() {
  const {
    categories, types, factors,
    addCategory, updateCategory, deleteCategory,
    addType, deleteType, addFactor, deleteFactor,
  } = useCarbon();
  const [tab, setTab] = useState("categories");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [factorModal, setFactorModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", code: "", status: "Active" });
  const [typeForm, setTypeForm] = useState({ categoryId: "", name: "", unit: "km", description: "" });
  const [factorForm, setFactorForm] = useState({ typeId: "", factor: "", unit: "kg CO₂e/unit", source: "DEFRA" });

  const switchTab = (t) => { setTab(t); setSearch(""); setPage(1); };

  const filteredCats = categories.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || (c.description || "").toLowerCase().includes(search.toLowerCase())
  );
  const filteredTypes = types.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));
  const filteredFactors = factors.filter((f) => {
    const n = types.find((t) => t.id === f.typeId)?.name || "";
    return n.toLowerCase().includes(search.toLowerCase()) || String(f.source || "").toLowerCase().includes(search.toLowerCase());
  });

  const catPage = useMemo(() => paginate(filteredCats, page), [filteredCats, page]);
  const typePage = useMemo(() => paginate(filteredTypes, page), [filteredTypes, page]);
  const factorPage = useMemo(() => paginate(filteredFactors, page), [filteredFactors, page]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.description?.trim()) {
      alert("Category name and description are required.");
      return;
    }
    if (categories.some((c) => c.name.toLowerCase() === formData.name.trim().toLowerCase())) {
      alert("Category name must be unique.");
      return;
    }
    addCategory({
      name: formData.name.trim(),
      code: (formData.code || formData.name).slice(0, 4).toUpperCase(),
      description: formData.description,
      status: formData.status,
    });
    setFormData({ name: "", description: "", code: "", status: "Active" });
    setShowModal(false);
  };

  return (
    <div className="master-page">
      <div className="master-header">
        <div>
          <div className="master-label">ADMINISTRATION</div>
          <h1>Master Management</h1>
        </div>
        {tab === "categories" && <button className="add-master-btn" onClick={() => setShowModal(true)}><FaPlus /> Add Category</button>}
        {tab === "types" && <button className="add-master-btn" onClick={() => setTypeModal(true)}><FaPlus /> Add Activity Type</button>}
        {tab === "factors" && <button className="add-master-btn" onClick={() => setFactorModal(true)}><FaPlus /> Add Emission Factor</button>}
      </div>

      <div className="master-summary">
        <button type="button" className={`master-stat-card ${tab === "categories" ? "selected" : ""}`} onClick={() => switchTab("categories")}>
          <div className="master-stat-icon green"><FaLeaf /></div>
          <div><span>Carbon Categories</span><strong>{categories.length}</strong></div>
        </button>
        <button type="button" className={`master-stat-card ${tab === "types" ? "selected" : ""}`} onClick={() => switchTab("types")}>
          <div className="master-stat-icon blue"><FaBolt /></div>
          <div><span>Activity Types</span><strong>{types.length}</strong></div>
        </button>
        <button type="button" className={`master-stat-card ${tab === "factors" ? "selected" : ""}`} onClick={() => switchTab("factors")}>
          <div className="master-stat-icon purple"><FaCar /></div>
          <div><span>Emission Factors</span><strong>{factors.length}</strong></div>
        </button>
      </div>

      {tab === "categories" && (
        <div className="master-card">
          <div className="master-card-header">
            <h2>Carbon Categories</h2>
            <div className="master-search"><FaSearch /><input placeholder="Search categories..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} /></div>
          </div>
          <div className="master-table-wrap">
            <table className="master-table">
              <thead><tr><th>#</th><th>Code</th><th>Category</th><th>Description</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {catPage.rows.map((c, i) => (
                  <tr key={c.id}>
                    <td>{(catPage.page - 1) * PAGE_SIZE + i + 1}</td>
                    <td><span className="unit-badge">{c.code}</span></td>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.description}</td>
                    <td>
                      <button className="status-badge" onClick={() => updateCategory(c.id, { status: c.status === "Active" ? "Inactive" : "Active" })}>{c.status}</button>
                    </td>
                    <td>
                      <button className="delete-master-btn" onClick={() => window.confirm("Delete category?") && deleteCategory(c.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager page={catPage.page} total={catPage.total} onChange={setPage} />
        </div>
      )}

      {tab === "types" && (
        <div className="master-card">
          <div className="master-card-header">
            <h2>Activity Types</h2>
            <div className="master-search"><FaSearch /><input placeholder="Search types..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} /></div>
          </div>
          <div className="master-table-wrap">
            <table className="master-table">
              <thead><tr><th>#</th><th>Activity</th><th>Category</th><th>Unit</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {typePage.rows.map((t, i) => (
                  <tr key={t.id}>
                    <td>{(typePage.page - 1) * PAGE_SIZE + i + 1}</td>
                    <td>{t.name}</td>
                    <td>{categories.find((c) => c.id === t.categoryId)?.name}</td>
                    <td>{t.unit}</td>
                    <td>{t.status}</td>
                    <td><button className="delete-master-btn" onClick={() => deleteType(t.id)}><FaTrash /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager page={typePage.page} total={typePage.total} onChange={setPage} />
        </div>
      )}

      {tab === "factors" && (
        <div className="master-card">
          <div className="master-card-header">
            <h2>Emission Factors</h2>
            <div className="master-search"><FaSearch /><input placeholder="Search factors..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} /></div>
          </div>
          <div className="master-table-wrap">
            <table className="master-table">
              <thead><tr><th>#</th><th>Activity</th><th>Factor</th><th>Unit</th><th>Source</th><th></th></tr></thead>
              <tbody>
                {factorPage.rows.map((f, i) => (
                  <tr key={f.id}>
                    <td>{(factorPage.page - 1) * PAGE_SIZE + i + 1}</td>
                    <td>{types.find((t) => t.id === f.typeId)?.name}</td>
                    <td><strong className="factor-value">{f.factor}</strong></td>
                    <td>{f.unit}</td>
                    <td>{f.source}</td>
                    <td><button className="delete-master-btn" onClick={() => deleteFactor(f.id)}><FaTrash /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager page={factorPage.page} total={factorPage.total} onChange={setPage} />
        </div>
      )}

      {showModal && (
        <div className="master-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="master-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>Add New Category</h2><button className="modal-close" onClick={() => setShowModal(false)}>×</button></div>
            <form onSubmit={handleAdd}>
              <div className="form-group"><label>Category Name *</label><input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
              <div className="form-group"><label>Description *</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
              <div className="form-row">
                <div className="form-group"><label>Code</label><input value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} /></div>
                <div className="form-group"><label>Status *</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    <option>Active</option><option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="modal-save-btn"><FaPlus /> Add Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {typeModal && (
        <div className="master-modal-overlay" onClick={() => setTypeModal(false)}>
          <div className="master-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Activity Type</h2>
            <div className="form-group"><label>Category *</label>
              <select value={typeForm.categoryId} onChange={(e) => setTypeForm({ ...typeForm, categoryId: e.target.value })}>
                <option value="">Select</option>
                {categories.filter((c) => c.status === "Active").map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Activity Name *</label><input value={typeForm.name} onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })} /></div>
            <div className="form-group"><label>Unit *</label><input value={typeForm.unit} onChange={(e) => setTypeForm({ ...typeForm, unit: e.target.value })} /></div>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setTypeModal(false)}>Cancel</button>
              <button className="modal-save-btn" onClick={() => {
                if (!typeForm.categoryId || !typeForm.name || !typeForm.unit) return alert("Category, name and unit required.");
                addType({ ...typeForm, code: typeForm.name.slice(0, 3).toUpperCase(), min: 0, max: 2000 });
                setTypeModal(false);
              }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {factorModal && (
        <div className="master-modal-overlay" onClick={() => setFactorModal(false)}>
          <div className="master-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Emission Factor</h2>
            <div className="form-group"><label>Activity Type *</label>
              <select value={factorForm.typeId} onChange={(e) => setFactorForm({ ...factorForm, typeId: e.target.value })}>
                <option value="">Select</option>
                {types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Factor *</label><input type="number" step="0.0001" value={factorForm.factor} onChange={(e) => setFactorForm({ ...factorForm, factor: e.target.value })} /></div>
            <div className="form-group"><label>Source</label><input value={factorForm.source} onChange={(e) => setFactorForm({ ...factorForm, source: e.target.value })} /></div>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setFactorModal(false)}>Cancel</button>
              <button className="modal-save-btn" onClick={() => {
                if (!factorForm.typeId || !factorForm.factor) return alert("Activity and factor required.");
                addFactor({ ...factorForm, status: "Active", from: new Date().toISOString().slice(0, 10), version: "1.0" });
                setFactorModal(false);
              }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MasterManagement;
