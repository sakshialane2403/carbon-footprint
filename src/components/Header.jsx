import "../css/Header.css";
import {
  FaSearch,
  FaBell,
  FaUserCircle
} from "react-icons/fa";

function Header() {
  return (
    <header className="header">

      <div>
        <h1>Good Afternoon 👋</h1>
        <p>Track your sustainability journey.</p>
      </div>

      <div className="header-right">

        <div className="search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        <div className="bell">

          <FaBell />

          <span></span>

        </div>

        <div className="user">

          <FaUserCircle className="user-icon"/>

          <div>

            <h4>Sakshi</h4>

            <small>Java Full Stack Intern</small>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;