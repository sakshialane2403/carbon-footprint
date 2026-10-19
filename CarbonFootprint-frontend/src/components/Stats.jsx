import "../css/Stats.css";

function Stats() {
  return (
    <section className="stats">
      <div className="stats-container">
        <div className="stats-card"><h2>1000+</h2><p>Users</p></div>
        <div className="stats-card"><h2>5000+</h2><p>Activities Logged</p></div>
        <div className="stats-card"><h2>120+</h2><p>Tons CO₂ Saved</p></div>
        <div className="stats-card"><h2>90%</h2><p>Happy Users</p></div>
      </div>
    </section>
  );
}

export default Stats;
