import "../css/EcoTips.css";

function EcoTips() {
  const tips = [
    "🌱 Use public transport whenever possible.",
    "💡 Switch off lights when not in use.",
    "♻️ Recycle plastic and paper waste.",
    "🚶 Walk or cycle for short distances.",
    "🌍 Plant at least one tree every year.",
  ];
  return (
    <div className="tips-card">
      <h2>🌱 Eco Tips</h2>
      <ul>{tips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
    </div>
  );
}

export default EcoTips;
