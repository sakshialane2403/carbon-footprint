import { useMemo, useState } from "react";
import { useCarbon } from "../../context/CarbonStore.jsx";

export default function UserListPage({ title, status, showRejectReason, allowApprove, allowReject, allowReapprove }) {
  const { users, setUserStatus } = useCarbon();
  const [q, setQ] = useState("");
  const [view, setView] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const list = useMemo(() => {
    return users
      .filter((u) => !status || u.status === status)
      .filter((u) => `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q.toLowerCase()));
  }, [users, status, q]);

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <span className="users-label">ADMIN</span>
          <h1>{title}</h1>
        </div>
      </div>
      <div className="users-card">
        <div className="users-card-header">
          <h2>{list.length} users</h2>
          <div className="users-search"><input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        </div>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Registered</th><th>Status</th>
              {showRejectReason && <th>Reason</th>}
              <th>Activities</th><th>Carbon</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.date}</td>
                <td><span className={`status-badge ${u.status === "APPROVED" ? "active-status" : u.status === "PENDING" ? "inactive-status" : "inactive-status"}`}>{u.status}</span></td>
                {showRejectReason && <td>{u.reason || "—"} {u.rejected || ""}</td>}
                <td>{u.activities}</td>
                <td>{u.carbon} kg</td>
                <td>
                  <button className="view-user-btn" onClick={() => setView(u)}>View</button>
                  {allowApprove && u.status === "PENDING" && <button className="btn sm" onClick={() => setConfirm({ u, to: "APPROVED" })}>Approve</button>}
                  {allowReject && u.status === "PENDING" && <button className="btn ghost sm" onClick={() => setConfirm({ u, to: "REJECTED" })}>Reject</button>}
                  {allowReapprove && u.status === "REJECTED" && <button className="btn sm" onClick={() => setUserStatus(u.id, "APPROVED")}>Re-approve</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {view && (
        <div className="master-modal-overlay" onClick={() => setView(null)}>
          <div className="master-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{view.firstName} {view.lastName}</h2>
            <p>{view.email}</p>
            <p>Status: {view.status}</p>
            <button className="modal-cancel-btn" onClick={() => setView(null)}>Close</button>
          </div>
        </div>
      )}
      {confirm && (
        <div className="master-modal-overlay" onClick={() => setConfirm(null)}>
          <div className="master-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{confirm.to === "APPROVED" ? "Approve" : "Reject"} {confirm.u.firstName}?</h2>
            {confirm.to === "REJECTED" && <p>They will not be able to log in until re-approved.</p>}
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setConfirm(null)}>Cancel</button>
              <button className="modal-save-btn" onClick={() => { setUserStatus(confirm.u.id, confirm.to, confirm.to === "REJECTED" ? "Rejected by admin" : ""); setConfirm(null); }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
