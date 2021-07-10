import { Link } from "react-router-dom";
import "./header.css";

function Header() {
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
          <Link to="/login">SIGN IN</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Header;
