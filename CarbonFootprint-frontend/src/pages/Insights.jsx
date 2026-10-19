import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { dashboardSummary } from "../services/activityService.js";

export default function Insights() {
  const [sum, setSum] = useState(null);
  useEffect(() => {
    dashboardSummary().then(setSum).catch(() => setSum({ byCategory: [] }));
  }, []);

  return (
    <div className="insights-page">
      <h1>Carbon insights</h1>
      <p className="pro-muted">Category-wise emissions from your logged activities.</p>
      <div className="chart-card" style={{ padding: 20, height: 380, marginTop: 8 }}>
        <ResponsiveContainer>
          <BarChart data={sum?.byCategory || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#16a34a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
