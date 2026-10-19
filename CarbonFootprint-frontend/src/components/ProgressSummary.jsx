import "../css/ProgressSummary.css";

function ProgressSummary() {
  return (
    <div className="summary-card">
      <h2>📈 Weekly Progress</h2>
      <div className="summary-grid">
        <div className="summary-box"><h3>125 kg</h3><p>Total Carbon</p></div>
        <div className="summary-box"><h3>45 kg</h3><p>Carbon Saved</p></div>
        <div className="summary-box"><h3>18</h3><p>Activities</p></div>
        <div className="summary-box"><h3>85%</h3><p>Eco Score</p></div>
      </div>
    </div>
  );
}

export default ProgressSummary;
