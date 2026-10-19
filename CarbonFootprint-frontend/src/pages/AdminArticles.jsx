import { useEffect, useState } from "react";
import api from "../services/api.js";
import "../css/Goals.css";

export default function AdminArticles() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: "", summary: "", content: "", status: "PUBLISHED" });
  const [msg, setMsg] = useState("");

  const load = () => api.get("/admin/articles").then((r) => setList(r.data || [])).catch(() => setList([]));
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/admin/articles", form);
      setForm({ title: "", summary: "", content: "", status: "PUBLISHED" });
      load();
      setMsg("Article published.");
    } catch {
      setMsg("Could not save article.");
    }
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <div>
          <div className="page-label">ADMINISTRATION / ARTICLES</div>
          <h1>Publish Articles</h1>
        </div>
      </div>
      {msg && <p className="ok" style={{ marginBottom: 16 }}>{msg}</p>}
      <form className="pro-admin-form" onSubmit={save}>
        <label>Title</label>
        <input required placeholder="Article title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <label>Summary</label>
        <input placeholder="Short summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
        <label>Content</label>
        <textarea required rows={6} placeholder="Full article" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <button className="add-goal-btn" type="submit">Publish article</button>
      </form>
      <div className="goals-grid">
        {list.map((a) => (
          <div className="goal-card" key={a.articleId}>
            <span className="goal-category">{a.status}</span>
            <h3>{a.title}</h3>
            <p>{a.summary}</p>
            <div className="goal-actions">
              {a.status !== "PUBLISHED" && (
                <button type="button" onClick={async () => { await api.patch(`/admin/articles/${a.articleId}/publish`); load(); }}>Publish</button>
              )}
              <button type="button" onClick={async () => { if (window.confirm("Delete?")) { await api.delete(`/admin/articles/${a.articleId}`); load(); } }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
