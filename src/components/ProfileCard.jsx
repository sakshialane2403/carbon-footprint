import "../css/ProfileCard.css";
import { FaUserCircle } from "react-icons/fa";

function ProfileCard() {

  return (

    <div className="profile-card">

      <FaUserCircle className="profile-avatar"/>

      <h3>Sakshi</h3>

      <p>Java Full Stack Intern</p>

      <div className="eco-score">

        🌍 Eco Score

        <h2>85 / 100</h2>

      </div>

    </div>

  );

}

export default ProfileCard;