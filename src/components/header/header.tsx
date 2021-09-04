import { Affix, Dropdown, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { getUser } from "../../lib/services/userInfo";

const dark = "dark-header";
const light = "light-header";

export default function Header() {
  const { pathname } = useLocation();
  const isLogin = pathname.match("/login");
  const isSignup = pathname.match("/signup");
  const isEvents = pathname.match("/events");
  const isGallery = pathname.match("/gallery");
  const { role } = getUser();
  return (
    <>
      <Affix
        offsetTop={0}
        onChange={(fixed) => {
          if (isLogin || isSignup) {
            return;
          }
          const ele = document.getElementById("header");
          if (!fixed) {
            ele.className = ele.className.replace(dark, light);
          } else {
            ele.className = ele.className.replace(light, dark);
          }
        }}
      >
        <header id="header" className={isLogin || isSignup ? dark : light}>
          <div className="container">
            <Link to="/" id="logo" title="HarrisonHighSchool">
              HarrisonHighSchool
            </Link>
            <nav id="menu">
              <ul>
                <li className={isGallery ? "current" : ""}>
                  <Link to="/gallery">Students</Link>
                </li>
                <li className={isEvents ? "current" : ""}>
                  <Link to="/events">Events</Link>
                </li>
              </ul>
              <ul>
                <li className={isGallery ? "current" : ""}>
                  <Link to="/gallery">Teachers</Link>
                </li>
                <li className={isEvents ? "current" : ""}>
                  <Link to="/events">Courses</Link>
                </li>
              </ul>
              <ul id="top-menu-right-item">
                <li>
                  {role ? (
                    <Link to={`/dashboard/${role}`}>DASHBOARD</Link>
                  ) : (
                    <Link to="/login">SIGN IN</Link>
                  )}
                </li>
              </ul>
            </nav>

            <Dropdown
              trigger={["click"]}
              className="menu-trigger"
              overlay={
                <Menu
                  style={{ fontFamily: "BebasNeue" }}
                  selectedKeys={[pathname.slice(1)]}
                >
                  <Menu.Item key="gallery">
                    <Link to="/gallery">Students</Link>
                  </Menu.Item>
                  <Menu.Item key="events1">
                    <Link to="/events">Events</Link>
                  </Menu.Item>
                  <Menu.Item key="gallery2">
                    <Link to="/gallery">Teachers</Link>
                  </Menu.Item>
                  <Menu.Item key="events">
                    <Link to="/events">Courses</Link>
                  </Menu.Item>
                  <Menu.Item key={isLogin ? "login" : "dashboard"}>
                    {role ? (
                      <Link to={`/dashboard/${role}`}>DASHBOARD</Link>
                    ) : (
                      <Link to="/login">SIGN IN</Link>
                    )}
                  </Menu.Item>
                </Menu>
              }
            >
              <span></span>
              {/* 必须有子元素保留 要不出错
              Error: React.Children.only expected to receive a single React element child. */}
            </Dropdown>
          </div>
        </header>
      </Affix>
    </>
  );
}
