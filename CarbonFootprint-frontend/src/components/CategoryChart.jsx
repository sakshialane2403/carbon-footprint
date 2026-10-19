import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const FALLBACK = [
  { name: "Transport", value: 40 },
  { name: "Electricity", value: 25 },
  { name: "Food", value: 20 },
  { name: "Shopping", value: 15 },
];
const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#14b8a6"];

function CategoryChart({ data }) {
  const chart = data && data.length ? data : FALLBACK;
  return (
    <div className="chart-card">
      <h3>Category breakdown</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={chart} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
            {chart.map((entry, index) => (
              <Cell key={entry.name || index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;
