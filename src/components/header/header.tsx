import { Link } from "react-router-dom";
import { getUser } from "../../lib/services/userInfo";

function Header() {
  const user = getUser();
  return (
    <header id="header">
      <div className="container">
        <Link to="/" id="logo" title="HarrisonHighSchool">
          HarrisonHighSchool
        </Link>
        <div className="menu-trigger"></div>
        <nav id="menu">
          <ul>
            <li>
              <Link to="/gallery">Students</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/gallery">Teachers</Link>
            </li>
            <li>
              <a href="#fancy" className="get-contact">
                Contact
              </a>
            </li>
          </ul>
          <nav>
            <ul>
              <li>
                {user.role ? (
                  <Link to={`/dashboard/${user.role}`}>DASHBOARD</Link>
                ) : (
                  <Link to="/login">SIGN IN</Link>
                )}
              </li>
            </ul>
          </nav>
        </nav>
      </div>
    </header>
  );
}
export default Header;
