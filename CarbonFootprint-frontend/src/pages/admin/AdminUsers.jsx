import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminUsers() {
  const [tab, setTab] = useState("PENDING");
  const [users, setUsers] = useState([]);

  const load = () => {
    const q = tab === "ALL" ? "" : `?status=${tab}`;
    api.get(`/admin/users${q}`).then((r) => setUsers(r.data));
  };
  useEffect(() => { load(); }, [tab]);

  const act = async (id, kind) => {
    await api.post(`/admin/users/${id}/${kind}`);
    load();
  };

  return (
    <>
      <h1>User management</h1>
      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        {["PENDING", "APPROVED", "REJECTED", "ALL"].map((t) => (
          <button key={t} className={tab === t ? "btn" : "btn ghost"} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="card" style={{ padding: 16 }}>
        <table>
          <thead>
            <tr><th>Name</th><th>Username</th><th>Email</th><th>Date</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.createdAt}</td>
                <td>{u.status}</td>
                <td>
                  {u.status === "PENDING" && (
                    <>
                      <button className="btn" onClick={() => act(u.id, "approve")}>Approve</button>{" "}
                      <button className="btn ghost" onClick={() => act(u.id, "reject")}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
