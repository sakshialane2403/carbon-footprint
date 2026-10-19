import "../css/Header.css";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

function Header({ profile, title, subtitle }) {
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = profile?.personalDetails?.firstName;
  const displayName = firstName || profile?.username || "there";

  return (
    <header className="header">
      <div>
        <h1>{title || `${greet}, ${displayName}`}</h1>
        <p>{subtitle || "Track your sustainability journey."}</p>
      </div>
      <div className="header-right">
        <div className="search">
          <FaSearch />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="bell" title="Notifications">
          <FaBell />
          <span></span>
        </div>
        <div className="user">
          <FaUserCircle className="user-icon" />
          <div>
            <h4>{displayName}</h4>
            <small>{profile?.role === "ADMIN" ? "Administrator" : "Member"}</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
