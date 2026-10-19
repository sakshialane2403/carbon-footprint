import { useEffect, useState } from "react";
import "../css/DashboardCards.css";
import { FaLeaf, FaCalendarWeek, FaCalendarAlt, FaList } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

function kg(v) {
  return `${Number(v || 0).toFixed(1)} kg`;
}

function DashboardCards() {
  const { user } = useAuth();
  const [s, setS] = useState({ today: 0, week: 0, month: 0, count: 0 });

  useEffect(() => {
    if (!user?.userId) return;
    const uid = user.userId;
    Promise.all([
      api.get("/reports/monthly", { params: { userId: uid, period: "today" } }),
      api.get("/reports/monthly", { params: { userId: uid, period: "7d" } }),
      api.get("/reports/monthly", { params: { userId: uid, period: "30d" } }),
      api.get("/dashboard/summary", { params: { userId: uid } }),
    ])
      .then(([t, w, m, sum]) => {
        setS({
          today: t.data?.totalEmission ?? 0,
          week: w.data?.totalEmission ?? 0,
          month: m.data?.totalEmission ?? 0,
          count: sum.data?.activityCount ?? sum.data?.totalActivities ?? 0,
        });
      })
      .catch(() => {});
  }, [user]);

  const cards = [
    { title: "Today's Emission", value: kg(s.today), subtitle: "CO₂e today", icon: <FaLeaf />, color: "green" },
    { title: "This Week", value: kg(s.week), subtitle: "Last 7 days", icon: <FaCalendarWeek />, color: "blue" },
    { title: "This Month", value: kg(s.month), subtitle: "Last 30 days", icon: <FaCalendarAlt />, color: "purple" },
    { title: "Total Activities", value: String(s.count), subtitle: "Logged records", icon: <FaList />, color: "orange" },
  ];

  return (
    <section className="cards">
      {cards.map((card) => (
        <div className={`card ${card.color}`} key={card.title}>
          <div className="card-top">
            <div>
              <h4>{card.title}</h4>
              <h2>{card.value}</h2>
              <p>{card.subtitle}</p>
            </div>
            <div className="icon-box">{card.icon}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default DashboardCards;
