import { Link } from "react-router-dom";
import "./header.css";
import { getUser } from "../../lib/services/userInfo";

function Header() {
  const user = getUser();
  return (
    <nav className="header">
      <ul>
        <li>
          <Link to="/events">EVENTS</Link>
        </li>
        <li>
          <Link to="/gallery">STUDENTS</Link>
        </li>
        <li>
          <Link to="/">HARRIS HIGH SCHOOL</Link>
        </li>
        <li>
          {user.role ? (
            <Link to={`/dashboard/${user.role}`}>DASHBOARD</Link>
          ) : (
            <Link to="/login">SIGN IN</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
export default Header;
