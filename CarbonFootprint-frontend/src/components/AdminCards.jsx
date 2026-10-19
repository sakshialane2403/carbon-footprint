import { useEffect, useState } from "react";
import "../css/AdminCards.css";
import { FaUsers, FaUserCheck, FaUserClock, FaUserTimes } from "react-icons/fa";
import api from "../services/api.js";

function AdminCards() {
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, rejected: 0, male: 0, female: 0 });

  const load = () => {
    api.get("/admin/users")
      .then((r) => {
        const list = (Array.isArray(r.data) ? r.data : []).filter(
          (u) => String(u.role || "").toUpperCase() !== "ADMIN"
        );
        const pending = list.filter((u) => String(u.status).toUpperCase() === "PENDING").length;
        const approved = list.filter((u) => {
          const s = String(u.status).toUpperCase();
          return s === "APPROVED" || s === "ACTIVE";
        }).length;
        const rejected = list.filter((u) => String(u.status).toUpperCase() === "REJECTED").length;
        setStats({
          total: list.length,
          active: approved,
          pending,
          rejected,
          male: list.filter((u) => String(u.gender || "").toUpperCase().startsWith("M")).length,
          female: list.filter((u) => String(u.gender || "").toUpperCase().startsWith("F")).length,
        });
      })
      .catch(() => {
        api.get("/admin/dashboard/stats")
          .then((r) => {
            const d = r.data || {};
            setStats({
              total: Number(d.totalRegisteredUsers ?? d.totalUsers ?? 0),
              active: Number(d.totalApprovedUsers ?? d.approvedUsers ?? 0),
              pending: Number(d.totalPendingUsers ?? d.pendingUsers ?? 0),
              rejected: Number(d.totalRejectedUsers ?? d.rejectedUsers ?? 0),
              male: Number(d.maleUsersCount ?? 0),
              female: Number(d.femaleUsersCount ?? 0),
            });
          })
          .catch(() => setStats({ total: 0, active: 0, pending: 0, rejected: 0 }));
      });
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, []);

  const cards = [
    { id: "total", title: "Total Registered Users", value: stats.total, icon: <FaUsers />, color: "blue" },
    { id: "active", title: "Approved Users", value: stats.active, icon: <FaUserCheck />, color: "green" },
    { id: "pending", title: "Pending Users", value: stats.pending, icon: <FaUserClock />, color: "orange" },
    { id: "rejected", title: "Rejected Users", value: stats.rejected, icon: <FaUserTimes />, color: "purple" },
  ];

  return (
    <>
      <section className="admin-cards">
        {cards.map((card) => (
          <div className={`admin-card ${card.color}`} key={card.id}>
            <div className="admin-card-top">
              <div>
                <h4>{card.title}</h4>
                <h2>{card.value}</h2>
              </div>
              <div className="admin-icon">{card.icon}</div>
            </div>
          </div>
        ))}
      </section>
      <section className="admin-cards" style={{ marginTop: 14 }}>
        <div className="admin-card blue">
          <div className="admin-card-top">
            <div><h4>Male Users</h4><h2>{stats.male}</h2></div>
          </div>
        </div>
        <div className="admin-card purple">
          <div className="admin-card-top">
            <div><h4>Female Users</h4><h2>{stats.female}</h2></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminCards;
