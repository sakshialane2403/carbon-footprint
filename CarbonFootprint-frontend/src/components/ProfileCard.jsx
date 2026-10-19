import "../css/ProfileCard.css";
import { FaUserCircle, FaLeaf, FaChartLine, FaRecycle } from "react-icons/fa";

function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <FaUserCircle className="profile-icon" />
        <h2>Sakshi</h2>
        <p>Java Full Stack Intern</p>
      </div>
      <div className="profile-stats">
        <div className="stat-card"><FaLeaf className="stat-icon" /><h4>Eco Score</h4><span>85 / 100</span></div>
        <div className="stat-card"><FaChartLine className="stat-icon" /><h4>Activities</h4><span>18</span></div>
        <div className="stat-card"><FaRecycle className="stat-icon" /><h4>Carbon Saved</h4><span>45 kg</span></div>
        <div className="stat-card"><FaLeaf className="stat-icon" /><h4>Rank</h4><span>Green Warrior</span></div>
      </div>
    </div>
  );
}

export default ProfileCard;
