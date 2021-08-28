import React, { useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import { Layout, message, Spin, Menu } from "antd";
import ManagerHome from "../manager/home";
import Students from "../manager/students";
import StudentDetail from "../manager/students/detail";
import Courses from "../manager/courses";
import CourseDetail from "../manager/courses/detail";
import AddCourse from "../manager/courses/add-course";
import EditCourse from "../manager/courses/edit-course";
import { getUser, removeUser } from "../../lib/services/userInfo";
import DashboardBreadcrumb from "../../components/breadcrumb/breadCrumb";

import { StyledHeader, LogoSpan } from "../../components/styled-elements";
import { logout } from "../../lib/services/api";
import { sideNavLists } from "../../lib/constants/side-nav-list";
import {
  getSideNavWithKeys,
  getMenuNodes,
  getMenuConfig,
} from "../../lib/utils/side-nav";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Teachers from "../manager/teachers";
import MessagePage from "../manager/message";
import MessagePanel from "../../components/messagePanel/message-panel";

const { Content, Sider } = Layout;

export default function DashboardChild() {
  const { role } = useParams<{ role: "manager" | "teacher" | "student" }>();
  const user = getUser();
  const history = useHistory();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  let sideNav, sideNavWithKeys, defaultOpenKeys, defaultSelectedKeys;
  if (!!user && (!role || role === user.role)) {
    sideNav = sideNavLists.find((item) => item.role === role)?.sideNav;
    sideNavWithKeys = getSideNavWithKeys(sideNav, role);
    const menuConfig = getMenuConfig(sideNavWithKeys, pathname);
    defaultOpenKeys = menuConfig.defaultOpenKeys;
    defaultSelectedKeys = menuConfig.defaultSelectedKeys;
  } else {
    return <Redirect to="/" />;
  }

  const handleLogout = async () => {
    setLoadingStatus(true);
    const result = await logout();
    setLoadingStatus(false);
    if (result.code >= 200 && result.code < 300) {
      removeUser();
      history.push("/login");
    } else {
      message.error(result.msg);
    }
  };
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Spin spinning={isLoading} tip="loading......">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "sticky",
              top: 0,
              left: 0,
            }}
          >
            <Link to="/" className="logo">
              <LogoSpan>CMS</LogoSpan>
            </Link>

            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={defaultSelectedKeys}
              defaultOpenKeys={defaultOpenKeys}
            >
              {getMenuNodes(sideNavWithKeys)}
            </Menu>
          </Sider>

          <Layout className="site-layout" id="contentLayout">
            <StyledHeader
              className="site-layout-background"
              style={{ padding: 0 }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
              <div>
                <span>{`Hi, ${role}!`}</span>&nbsp;
                <span style={{ margin: "0 30px" }}>
                  <MessagePanel />
                </span>
                <span
                  className="logout"
                  onClick={handleLogout}
                  style={{ marginRight: 20 }}
                >
                  <LogoutOutlined style={{ margin: 5 }} />
                  Logout
                </span>
              </div>
            </StyledHeader>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 280,
              }}
            >
              <DashboardBreadcrumb
                sideNavWithKeys={sideNavWithKeys}
                role={role}
              />
              {/* <StateContext.Provider
                value={{
                  sideNavWithKeys,
                  setDefaultOpenKeys,
                  setDefaultSelectedKeys,
                }}
              > */}
              <Switch>
                <Route exact path="/dashboard/manager">
                  <ManagerHome />
                </Route>
                <Route exact path="/dashboard/manager/students">
                  <Students />
                </Route>
                <Route exact path="/dashboard/manager/students/:id">
                  <StudentDetail />
                </Route>
                <Route exact path="/dashboard/manager/teachers">
                  <Teachers />
                </Route>
                <Route exact path="/dashboard/manager/courses">
                  <Courses />
                </Route>
                <Route exact path="/dashboard/manager/courses/:id">
                  <CourseDetail />
                </Route>
                <Route exact path="/dashboard/manager/add-course">
                  <AddCourse />
                </Route>
                <Route exact path="/dashboard/manager/edit-course">
                  <EditCourse />
                </Route>
                <Route exact path="/dashboard/manager/message">
                  <MessagePage />
                </Route>
                {/* 如果role是student或teacher，。。。 */}
              </Switch>
              {/* </StateContext.Provider> */}
            </Content>
          </Layout>
        </Layout>
      </Spin>
    </>
  );
}
