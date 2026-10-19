import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCheck, FaUserTimes, FaUsers } from "react-icons/fa";
import "../css/UsersTable.css";
import api from "../services/api.js";

function Users({ filter, title }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get("/admin/users");
      const list = (Array.isArray(data) ? data : []).map((u) => ({
        id: u.userId ?? u.id,
        username: u.username,
        name: u.name || u.personalDetails?.firstName || u.username,
        email: u.email,
        mobile: u.mobile || u.mobileNumber || u.personalDetails?.mobileNumber || "",
        status: String(u.status || "").toUpperCase(),
        role: u.role,
        createdAt: u.createdAt || "",
      }));
      setUsers(list);
      setMsg("");
    } catch (e) {
      setUsers([]);
      setMsg(e.message || "Could not load users. Login as admin again.");
    }
  };

  useEffect(() => { load(); }, []);

  const act = async (id, action) => {
    try {
      await api.patch(`/admin/users/${id}/${action}`);
      setMsg(action === "approve" ? "User approved. They can login now." : "User rejected.");
      load();
    } catch {
      setMsg("Action failed.");
    }
  };

  const shown = users.filter((u) => {
    if (filter === "PENDING") return u.status === "PENDING";
    if (filter === "APPROVED") return u.status === "APPROVED" || u.status === "ACTIVE";
    if (filter === "REJECTED") return u.status === "REJECTED";
    return true;
  }).filter((u) => `${u.name} ${u.email} ${u.status}`.toLowerCase().includes(search.toLowerCase()));

  const heading = title || "All Users";

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <span className="users-label">ADMINISTRATION</span>
          <h1>{heading}</h1>
        </div>
        <div className="users-total"><FaUsers /><div><strong>{shown.length}</strong><span>Records</span></div></div>
      </div>
      {msg && <p className="ok" style={{ margin: "0 0 12px" }}>{msg}</p>}
      <div className="users-card">
        <div className="users-card-header">
          <h2>{heading}</h2>
          <div className="users-search"><FaSearch /><input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        </div>
        <div className="users-table-scroll">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
                {(filter === "PENDING" || !filter) && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {shown.map((user, i) => (
                <tr key={user.id}>
                  <td>{i + 1}</td>
                  <td><strong>{user.name}</strong></td>
                  <td>@{user.username || user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile || "—"}</td>
                  <td>
                    <span className={user.status === "APPROVED" || user.status === "ACTIVE" ? "status-badge active-status" : "status-badge inactive-status"}>
                      {user.status}
                    </span>
                  </td>
                  {(filter === "PENDING" || !filter) && (
                    <td>
                      {user.status === "PENDING" && (
                        <div className="user-actions">
                          <button className="approve-btn" type="button" onClick={() => act(user.id, "approve")}>Approve</button>
                          <button className="reject-btn" type="button" onClick={() => act(user.id, "reject")}>Reject</button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {!shown.length && (
                <tr>
                  <td colSpan={7} className="no-users">No registration requests here.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="users-card-footer">Showing {shown.length} users</div>
      </div>
    </div>
  );
}

export default Users;
