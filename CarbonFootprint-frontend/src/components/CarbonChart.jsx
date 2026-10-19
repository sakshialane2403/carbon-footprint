import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", carbon: 22 },
  { day: "Tue", carbon: 35 },
  { day: "Wed", carbon: 28 },
  { day: "Thu", carbon: 42 },
  { day: "Fri", carbon: 31 },
  { day: "Sat", carbon: 18 },
  { day: "Sun", carbon: 25 },
];

function CarbonChart() {
  return (
    <div className="chart-card">
      <h3>Emissions trend (this week)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef2f0" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="carbon" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CarbonChart;
