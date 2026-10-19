import { useEffect, useState } from "react";
import "../css/RecentActivities.css";
import { FaCar, FaBolt, FaShoppingBag, FaUtensils, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listActivities } from "../services/activityService.js";

const iconFor = (cat) => {
  if (cat === "Transport") return <FaCar />;
  if (cat === "Electricity") return <FaBolt />;
  if (cat === "Food") return <FaUtensils />;
  if (cat === "Shopping") return <FaShoppingBag />;
  return <FaLeaf />;
};

function RecentActivities() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    listActivities().then((list) => setRows(list.slice(0, 6))).catch(() => setRows([]));
  }, []);

  return (
    <div className="activity-card">
      <div className="activity-header">
        <h2>Recent Activities</h2>
        <button type="button" onClick={() => navigate("/activity-history")}>View All</button>
      </div>
      {!rows.length && <p className="pro-muted">No activities yet. Add one to see it here.</p>}
      {!!rows.length && (
        <table>
          <thead>
            <tr><th>Activity</th><th>Category</th><th>Date</th><th>CO₂</th><th>Status</th></tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="activity-info">
                    <div className="activity-icon">{iconFor(item.category)}</div>
                    {item.activityName}
                  </div>
                </td>
                <td><span className="category">{item.category}</span></td>
                <td>{item.date}</td>
                <td>{item.emission} kg</td>
                <td><span className="status">Saved</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentActivities;
