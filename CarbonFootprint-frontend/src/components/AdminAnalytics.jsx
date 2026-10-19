import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import "../css/AdminAnalytics.css";

function AdminAnalytics() {
  const [lineData] = useState([
    { month: "Jan", carbon: 320 },
    { month: "Feb", carbon: 280 },
    { month: "Mar", carbon: 260 },
    { month: "Apr", carbon: 240 },
    { month: "May", carbon: 210 },
    { month: "Jun", carbon: 180 },
  ]);
  const [pieData] = useState([
    { name: "Transport", value: 40 },
    { name: "Electricity", value: 25 },
    { name: "Food", value: 20 },
    { name: "Shopping", value: 15 },
  ]);
  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6"];

  return (
    <div className="analytics-section">
      <div className="analytics-card">
        <h2>Monthly Carbon Emission</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="carbon" stroke="#16a34a" strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="analytics-card">
        <h2>Activity Categories</h2>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((item, index) => (
                <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminAnalytics;
