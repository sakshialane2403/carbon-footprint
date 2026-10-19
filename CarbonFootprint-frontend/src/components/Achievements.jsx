import "../css/Achievements.css";
import { FaMedal, FaLeaf, FaRecycle, FaAward } from "react-icons/fa";

function Achievements() {
  const badges = [
    { icon: <FaLeaf />, title: "Green Warrior", description: "Reduced carbon emission by 20%" },
    { icon: <FaRecycle />, title: "Recycle Hero", description: "Completed 50 recycling activities" },
    { icon: <FaMedal />, title: "Eco Champion", description: "Achieved Eco Score above 80" },
    { icon: <FaAward />, title: "Sustainability Star", description: "Completed monthly sustainability goal" },
  ];
  return (
    <div className="achievement-card">
      <h2>🏆 Achievements & Badges</h2>
      <div className="badge-grid">
        {badges.map((badge, index) => (
          <div className="badge-box" key={index}>
            <div className="badge-icon">{badge.icon}</div>
            <h3>{badge.title}</h3>
            <p>{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
